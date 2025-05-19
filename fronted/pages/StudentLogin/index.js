// pages/student-login.jsx
import { useState } from 'react';
import { Calendar, KeyRound } from 'lucide-react';
import { loginStudent } from '@/redux/Actions/StudentActions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
export default function StudentLoginPage() {
  const [dob, setDob] = useState('');
  const dispatch=useDispatch();
  const router=useRouter();
  const [parentCode, setParentCode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login action (call your backend here)
    
   const result=  dispatch(loginStudent({ dob, parentCode }));
   if (result) {
        router.push('/StudentDashboard/Profile'); // redirect after login
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Student Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="relative">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Parent Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Code</label>
            <div className="relative">
              <input
                type="text"
                value={parentCode}
                onChange={(e) => setParentCode(e.target.value)}
                required
                placeholder="Enter Parent Code"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <KeyRound className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl shadow-md hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
