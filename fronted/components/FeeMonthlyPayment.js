import React from 'react';
import { CheckCircle, IndianRupee, Wallet2 } from 'lucide-react';

const MonthlyFeeTable = ({ payments, onPay }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Monthly Fee Details</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2">Child Name</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Month</th>
            <th className="px-4 py-2">Tuition Fee</th>
            <th className="px-4 py-2">Bus Fee</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment) => {
            const isPaid = payment.status === 'paid';
            const fullName = `${payment.studentId?.firstName || ''} ${payment.studentId?.lastName || ''}`;
            const className = payment.studentId?.currentSection?.classId?.className || 'N/A';
            const sectionName = payment.studentId?.currentSection?.sectionName || '';

            return (
              <tr key={payment._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-medium text-gray-800">{fullName}</td>
                <td className="px-4 py-2">{className} {sectionName}</td>
                <td className="px-4 py-2">{payment.month}</td>
                <td className="px-4 py-2">₹{payment.breakdown?.tuition || 0}</td>
                <td className="px-4 py-2">₹{payment.breakdown?.bus || 0}</td>
                <td className="px-4 py-2 font-semibold">₹{payment.amount}</td>
                <td className="px-4 py-2 capitalize">{isPaid ? 'Paid' : 'Unpaid'}</td>
                <td className="px-4 py-2 text-center">
                  {isPaid ? (
                    <CheckCircle className="text-green-600 mx-auto" size={20} />
                  ) : (
                    <button
                      onClick={() => onPay(payment)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center justify-center gap-1 text-sm mx-auto"
                    >
                      <Wallet2 size={16}  
                      />
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyFeeTable;
