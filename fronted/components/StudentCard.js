// components/StudentTable.jsx
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const StudentTable = ({ students, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
          <th className="px-4 py-3">REG.NO</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">fatherName</th>
            <th className="px-4 py-3">parentCode</th>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3">currentSection</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students?.map(student => (
            <tr key={student._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{student.registrationNumber}</td>
              <td className="px-4 py-3 font-medium text-gray-800">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-4 py-3">{student.email}</td>
              <td className="px-4 py-3">{student.parent?.fatherName || 'N/A'}</td>
              <td className="px-4 py-3">{student.parentCode}</td>
              
              <td className="px-4 py-3">
                {student.currentSection?.classId?.className || 'N/A'}
              </td>
              <td className="px-4 py-3">
                {student.currentSection?.sectionName || 'N/A'}
              </td>
              <td className="px-4 py-3 capitalize">{student.status}</td>
              <td className="px-4 py-3 flex justify-center gap-2 text-gray-600">
                <button onClick={() => onView(student)} className="hover:text-blue-600 cursor-pointer" title="View">
                  <Eye size={18} />
                </button>
              
  
             <button onClick={() => onEdit(student)} className="hover:text-yellow-500 cursor-pointer" title="Edit">
                  <Edit size={18} />
              </button>
              <button onClick={() => onDelete(student._id)} className="hover:text-red-500 cursor-pointer" title="Delete">
              <Trash2 size={18} />
                  </button>
 

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
