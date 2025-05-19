'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginTeacher } from '@/redux/Actions/TeacherActions';
import { useRouter } from 'next/navigation';

const TeacherLoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });

  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.teacher
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.code) {
      alert('Please enter either email/password or login code');
      return;
    }

    try {
      const result = await dispatch(loginTeacher(formData));
      if (result.meta.requestStatus === 'fulfilled') {
        router.push('/TeacherDashboard/AllStudent'); // redirect after login
      }
    } catch (error) {
      console.log('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Teacher Login
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-center text-gray-500 text-sm">
          OR
        </div>

        {/* Code */}
        <div>
          <label className="block text-gray-700 mb-1">Login Code</label>
          <input
            type="text"
            name="code"
            placeholder="Enter code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default TeacherLoginForm;
