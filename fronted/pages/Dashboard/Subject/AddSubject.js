import { useState } from "react";
import { Book, Hash, Send } from "lucide-react";

const SubjectForm = ({ onSubmit }) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      subjectName: subjectName.toUpperCase(),
      subjectCode: subjectCode.toUpperCase(),
    };

    onSubmit(formData); // You pass this function from parent to handle submission
    setSubjectName("");
    setSubjectCode("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold cursor-pointer mb-4 text-center">Add New Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Name */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Book className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Subject Code */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Hash className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          <Send size={16} />
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;
