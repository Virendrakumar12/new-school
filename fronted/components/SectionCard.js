import { Eye, Pencil, Trash2, UserRoundPlus, BookPlus } from 'lucide-react';

const SectionCard = ({
  section,
  onAddTeacher,
  onAddSubject,
  onUpdate,
  onDelete,
  onView, // new prop
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between gap-4 w-full">
      {/* Top Section: Basic Info */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold uppercase">{section?.sectionName}</h2>
          <p className="text-sm text-gray-600">
          <p>
  Class Teacher:
  {section?.classTeacher ? (
    <>
      <span className="text-gray-800 font-medium">{section.classTeacher?.firstName}</span>{' '}
      <span className="text-gray-800 font-medium">{section.classTeacher?.lastName}</span>
    </>
  ) : (
    <span className="text-gray-800 font-medium">Not Assigned</span>
  )}
</p>

          </p>
        </div>

        <Eye
          className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onView(section)}
        />
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          onClick={() => onAddTeacher(section)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <UserRoundPlus size={18} />
          {section?.classTeacher ? 'Change Class Teacher' : 'Add Class Teacher'}
        </button>

        <button
          onClick={() => onAddSubject(section)}
          className="flex items-center gap-1 text-green-600 hover:text-green-800"
        >
          <BookPlus size={18} />
          Add Subject
        </button>

        <Pencil
          className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onUpdate(section)}
        />

        <Trash2
          className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onDelete(section._id)}
        />
      </div>
    </div>
  );
};

export default SectionCard;
