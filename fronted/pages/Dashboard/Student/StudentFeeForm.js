import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { generateMonthlyFees } from '@/redux/Actions/StudentActions';
import { useRouter } from 'next/router';
import axios from 'axios';

const GenerateFeeForm = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { studentDetails } = useSelector((state) => state.student);
console.log("student fee ",studentDetails)
  const [formData, setFormData] = useState({
    admissionMonth: '',
    year: new Date().getFullYear(),
    tuitionFee: '',
    busFee: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const { year, admissionMonth, tuitionFee, busFee } = formData;
    try {
      const data = {
    studentId: studentDetails._id,
    year:year,
    admissionMonth:admissionMonth,
    tuitionFee:tuitionFee,
    busFee:busFee
  };
 console.log("fee data",data);
 const result= dispatch(generateMonthlyFees(data));
      if(result){
        alert("fee generated successfully")
        router.push("/Dashboard/Student/StudentFee")
      }
    } catch (error) {
      console.error(error);
      alert('Error generating fees');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <PlusCircle className="text-blue-500" /> Add Student Fee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Admission Month</label>
          <select
            name="admissionMonth"
            value={formData.admissionMonth}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Year (Start Year)</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tuition Fee</label>
          <input
            type="number"
            name="tuitionFee"
            value={formData.tuitionFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Fee</label>
          <input
            type="number"
            name="busFee"
            value={formData.busFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Fee
        </button>
      </form>
    </div>
  );
};

export default GenerateFeeForm;
