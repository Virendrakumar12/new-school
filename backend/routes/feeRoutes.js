const express = require('express');
const router = express.Router();
const MonthPayment = require("../models/monthlyPayment");
const Student=require("../models/student");
const {createOrder,verifyPayment}=require("../controllers/Payment")




router.post('/verifyPayment', verifyPayment); 
router.post('/createOrder', createOrder);







// Academic session: March to February
const sessionMonths = [
  'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
  'January', 'February'
];


// Create 12-month fee records for a student



// Helper function to determine session string
function getSessionString(year) {
  return `${year}-${year + 1}`;
}

// 🔹 Generate 12-Month Fees from Admission Month (Avoid Duplicates)
router.post('/generateFees', async (req, res) => {
  const { studentId, admissionMonth, year, tuitionFee = 1000, busFee = 0 } = req.body;
  const session = getSessionString(year);
  const feeType = busFee > 0 ? 'combined' : 'tuition';
const tuition = Number(tuitionFee) || 0;
const bus = Number(busFee) || 0;
const totalAmount = tuition + bus;

  try {
    const monthsToGenerate = [];
    let startAdding = false;

    for (let month of sessionMonths) {
      if (month === admissionMonth) startAdding = true;
      if (startAdding) monthsToGenerate.push(month);
    }

    const feesToInsert = [];

    for (let month of monthsToGenerate) {
      const isNextYear = (month === 'January' || month === 'February');
      const targetYear = isNextYear ? year + 1 : year;

      const alreadyExists = await MonthPayment.exists({
        studentId,
        year: targetYear,
        month
      });

      if (!alreadyExists) {
        feesToInsert.push({
          studentId,
          year: targetYear,
          month,
          session,
          feeType,
          breakdown: {
            tuition: tuitionFee,
            bus: busFee
          },
          amount:totalAmount,
          status: 'unpaid'
        });
      }
    }

    if (feesToInsert.length === 0) {
      return res.status(409).json({ message: '⚠️ Fee records already exist for the given months.' });
    }

    await MonthPayment.insertMany(feesToInsert);
     await Student.findByIdAndUpdate(studentId, { hasFeeGenerated: true });
    res.status(201).json({ message: '✅ Fees generated successfully', inserted: feesToInsert.length });

  } catch (error) {
    console.error('Fee generation failed:', error);
    res.status(500).json({ message: '❌ Error generating monthly fees' });
  }
});

router.put('/updateFees', async (req, res) => {
  const { studentId, session, tuitionFee = 1000, busFee = 0 } = req.body;
  const feeType = busFee > 0 ? 'combined' : 'tuition';

  try {
    const updated = await MonthPayment.updateMany(
      {
        studentId,
        session,
        status: 'unpaid' // Only update unpaid records
      },
      {
        $set: {
          feeType,
          breakdown: {
            tuition: tuitionFee,
            bus: busFee
          },
          amount: tuitionFee + busFee
        }
      }
    );

    res.status(200).json({
      message: `✅ Updated ${updated.modifiedCount} unpaid records for session ${session}`,
    });
  } catch (error) {
    console.error('Fee update failed:', error);
    res.status(500).json({ message: '❌ Error updating monthly fees' });
  }
});

router.get("/student/:studentId",async(req,res)=>{
  console.log("fetch table ",req.params);
 const { studentId } = req.params;
console.log("student id",studentId)
  try {
    const payments = await MonthPayment.find({ studentId })
      .populate({
        path: 'studentId',
        select: 'firstName lastName currentSection',
        populate: {
          path: 'currentSection',
          select: 'sectionName classId',
          populate: {
            path: 'classId',
            select: 'className',
          }
        }
      })
      .sort({ createdAt: 1 });

    res.status(200).json(payments);
  } catch (err) {
    console.error('Error fetching monthly payments:', err);
    res.status(500).json({ message: '❌ Failed to fetch monthly payments' });
  }

})
// routes/paymentRoutes.js
router.delete('/deleteMonthlyFee/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required in URL params.' });
        }

        const result = await MonthPayment.deleteMany({ studentId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No fee records found for this student.' });
        }
        await Student.findByIdAndUpdate(studentId, { hasFeeGenerated: false });
        res.status(200).json({
            message: 'All monthly fee records for the student have been deleted successfully.',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Error deleting monthly fees:', error);
        res.status(500).json({ message: 'Server error while deleting monthly fees.' });
    }
});


module.exports = router;
