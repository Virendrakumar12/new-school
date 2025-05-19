

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginParent } from '@/redux/Actions/ParentActions';
import { LogIn, KeyRound } from 'lucide-react';
import { useRouter } from 'next/router';
const ParentLogin =() => {
  const [code, setCode] = useState('');
  const router=useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.parent);

  const handleSubmit =async (e) => {
    e.preventDefault();
   const result=await dispatch(loginParent({ code }));
    if (result) {
        router.push('/ParentDashboard/ParentProfile'); // redirect after login
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-300 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Parent Login</h2>
          <p className="text-sm text-gray-500">Enter your parent code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter parent code"
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentLogin;
