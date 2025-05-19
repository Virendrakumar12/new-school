import { Eye, Pen, Trash2, BookOpen } from "lucide-react";

const SubjectCard = ({ subject, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition hover:shadow-lg group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">{subject.subjectName}</h3>
          
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4">
      <h3 className="text-xl font-semibold  text-gray-800">code:{subject.subjectCode}</h3>
      </p>

      <div className="flex justify-end gap-3">
       
        <button
          onClick={() => onUpdate(subject)}
          className="p-2 rounded-full cursor-pointer hover:bg-yellow-100 transition"
          title="Edit"
        >
          <Pen className="w-5 h-5 text-yellow-600" />
        </button>
        <button
          onClick={() => onDelete(subject)}
          className="p-2 rounded-full cursor-pointer hover:bg-red-100 transition"
          title="Delete"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
