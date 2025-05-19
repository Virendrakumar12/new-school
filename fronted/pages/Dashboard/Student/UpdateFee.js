import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader, Save } from 'lucide-react';
import axiosInstance from '@/Utils/axiosInstance';

const UpdateFeesForm = () => {
  const { studentDetails } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    session: '',
    tuitionFee: 1000,
    busFee: 0,
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  // Generate session options dynamically from current year
  const getSessionOptions = () => {
    const currentYear = new Date().getFullYear();
    const sessions = [];
    for (let i = 0; i < 10; i++) {
      const start = currentYear + i;
      const end = start + 1;
      sessions.push(`${start}-${end}`);
    }
    return sessions;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tuitionFee' || name === 'busFee' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await axiosInstance.put('/fees/updateFees', {
        studentId: studentDetails._id,
        session: formData.session,
        tuitionFee: formData.tuitionFee,
        busFee: formData.busFee,
      });

      setResponse(res.data.message || 'Fees updated successfully!');
    } catch (err) {
      console.error(err);
      setResponse('Error updating fees.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Save className="text-green-500" /> Update Unpaid Monthly Fees
        <h1 className="text-green-500">{studentDetails.firstName}</h1>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Session</label>
          <select
            name="session"
            value={formData.session}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Select Session</option>
            {getSessionOptions().map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tuition Fee</label>
            <input
              type="number"
              name="tuitionFee"
              value={formData.tuitionFee}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" /> Updating...
            </>
          ) : (
            <>
              <Save className="mr-2" /> Update Unpaid Fees
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="mt-4 text-sm text-center text-blue-600 font-medium">
          {response}
        </div>
      )}
    </div>
  );
};

export default UpdateFeesForm;
