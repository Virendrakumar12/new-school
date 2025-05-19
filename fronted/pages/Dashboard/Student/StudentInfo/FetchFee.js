// pages/student/MonthlyPayments.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyFees } from '@/redux/Actions/StudentActions';
import MonthlyFeeTable from '@/components/FeeMonthlyPayment';
import axiosInstance from '@/Utils/axiosInstance';
const MonthlyPayments = () => {
  const dispatch = useDispatch();
  const { studentDetails } = useSelector((state) => state.student);
  const { fees, loading, error } = useSelector((state) => state.student);
  
  useEffect(() => {
    if (studentDetails?._id) {
      dispatch(fetchMonthlyFees(studentDetails._id));
    }
  }, [studentDetails, dispatch]);

 const handlePay = async (payment) => {
  try {
    // Step 1: Create order on server
    const { data } = await axiosInstance.post("/fees/createOrder", {
      amount: payment.amount, // amount in paisa if backend expects that
      studentId: payment.studentId._id,
      month: payment.month,
      year: payment.year,
    });

    const { order } = data;

    // Step 2: Setup Razorpay options
    const options = {
      key:'rzp_test_tpQcPeL4OMk4bG', // your public key
      amount: order.amount,
      currency: order.currency,
      name: "SUN RISE INTERNATIONAL PUBLIC SCHOOL",
      description: "Monthly Tuition Fee",
      order_id: order.id,
      handler: async function (response) {
        // Step 3: On success, verify payment
        await axiosInstance.post("/fees/verifyPayment", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          studentId: payment.studentId._id,
          month: payment.month,
          year: payment.year,
        });

        // Optional: refetch fee data
        dispatch(fetchMonthlyFees(studentDetails._id));
        alert("Payment Successful!");
      },
      prefill: {
        name: `${payment.studentId.firstName} ${payment.studentId.lastName}`,
        email: payment.studentId.email || "",
        contact: payment.studentId.phone || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment failed", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Monthly Fee Details</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && <MonthlyFeeTable payments={fees} onPay={handlePay} />}
    </div>
  );
};

export default MonthlyPayments;
