import { User, Eye, BadgeDollarSign } from "lucide-react";

const ParentStudentCard = ({ student, onViewDetails, onViewFees }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 ease-in-out group">
      
      {/* Header with Icon */}
      <div className="flex items-center gap-4 mb-4">
        <User className="w-10 h-10 bg-white text-indigo-600 p-2 rounded-full shadow-md" />
        <div>
          <h2 className="text-xl font-bold">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-sm text-indigo-100">Reg No: {student.registrationNumber}</p>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => onViewDetails(student)}
          title="View Student Details"
          className="p-2 bg-white rounded-full hover:bg-indigo-100 transition"
        >
          <Eye className="w-5 h-5 text-indigo-600" />
        </button>

        <button
          onClick={() => onViewFees(student)}
          title="View Fee Details"
          className="p-2 bg-white rounded-full hover:bg-green-100 transition"
        >
          <BadgeDollarSign className="w-5 h-5 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default ParentStudentCard;
