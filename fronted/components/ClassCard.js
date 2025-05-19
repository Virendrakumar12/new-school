import { Eye, Edit, Trash, Plus } from 'lucide-react';

const ClassCard = ({ classData, onView, onUpdate, onDelete, onAdd }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 relative">
      {/* Add Section Button - Top Right */}
      <div className="absolute top-2 right-2 group">
        <button
          onClick={() => onAdd(classData._id)}
          className="p-2 bg-blue-500 cursor-pointer text-white rounded-full hover:bg-blue-600 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
        <div className="absolute top-full mt-1 cursor-pointer right-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
          Add Section
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800">{classData.className}</h3>
      <p className="text-gray-600">Tuition Fee: ₹{classData.tuitionFee}</p>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => onView(classData._id)}
            className="text-blue-500 cursor-pointer hover:text-blue-600"
          >
            <Eye size={20} />
          </button>

          

          
        </div>
      </div>
    </div>
  );
};

 export default ClassCard;