'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchool } from '@/redux/Actions/School/SchoolActions'; // your redux action
import { useRouter } from 'next/navigation';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector(state => state.schoolLogin);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginSchool(formData));
    if (!result.error) { // check if login was successful
      router.push('/AdminDashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 to-purple-600 px-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">School Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autocomplete="current-password"

              required
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Code Field */}
          <div className="relative">
            <Key className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="code"
              placeholder="School Code"
              value={formData.code}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
