// components/TeacherCard.jsx
import { Eye, Pencil, Trash2, DollarSign } from 'lucide-react';
import { IndianRupee } from "lucide-react";
const TeacherCard = ({ teacher, onDelete, onEdit, onView, onSalary }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
      
      {/* Left Section: Teacher Info */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold capitalize">{teacher.firstName} {teacher.lastName}</h2>
        <p className="text-sm text-gray-600">{teacher.email}</p>
        <p className="text-sm text-gray-500">{teacher.phone}</p>
        <p className="text-sm text-gray-500">{teacher.code}</p>
        
      </div>

      {/* Right Section: Actions */}
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-start sm:justify-end">
        <Eye
          className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onView(teacher)}
        />
        <Pencil
          className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onEdit(teacher)}
        />
        <div className="relative group inline-block">
  <IndianRupee
    className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => onSalary(teacher._id)}
  />
  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
    Add Salary of a month
  </span>
</div>

        
        <Trash2
          className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onDelete(teacher._id)}
        />
      </div>
    </div>
  );
};

export default TeacherCard;
