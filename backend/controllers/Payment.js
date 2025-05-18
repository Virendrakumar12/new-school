// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const MonthPayment=require("../models/monthlyPayment")
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.createOrder = async (req, res) => {
  const { amount, studentId, month, year } = req.body;
console.log("i am at create order",req.body);
  const options = {
    amount: amount * 100, // Razorpay needs paise
    currency: "INR",
    receipt: `rcpt_${studentId.slice(0, 6)}_${month}_${Date.now()}`,
notes: {
      studentId,
      month,
      year,
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({order});
  } catch (err) {
    console.error('Razorpay Order Error:', err);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};

// assuming you're tracking monthly payments

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      studentId,
      month,
      year,
    } = req.body;
 console.log("i ma at very payment",req.body);
    // Create the expected signature
    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Compare signatures
    if (sign !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Signature verified → update DB
    const updatedPayment = await MonthPayment.findOneAndUpdate(
      { studentId: studentId, month, year },
      {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId:razorpay_order_id,
        razorpaySignature:razorpay_signature,
        paidAt: new Date(),
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment record not found" });
    }
console.log("verify successfully",updatedPayment);
    res.status(200).json({
      message: "Payment verified and updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

