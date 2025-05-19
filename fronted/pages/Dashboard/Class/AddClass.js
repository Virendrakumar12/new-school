'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createClass } from '@/redux/Actions/ClassActions';
import { BookOpen, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
export default function ClassForm() {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.classCreate || {});

  const [formData, setFormData] = useState({
    className: '',
    tuitionFee: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{
    const res = await dispatch(createClass(formData)).unwrap();
    enqueueSnackbar("class created successfully!", { variant: "success" })
    if (!res.error) {
      
      
      router.push('/AdminDashboard'); // or refresh class list
    }
  }catch(error){
    enqueueSnackbar(error, { variant: 'error' });
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 to-indigo-600 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create New Class
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Class Name */}
          <div className="relative">
            <BookOpen className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="className"
              placeholder="Class Name (e.g., Class 1)"
              value={formData.className}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Tuition Fee */}
          <div className="relative">
            <DollarSign className="absolute top-3 left-3 text-gray-400" />
            <input
              type="number"
              name="tuitionFee"
              placeholder="Tuition Fee (e.g., 12000)"
              value={formData.tuitionFee}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            {loading ? 'Creating...' : 'Create Class'}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}
