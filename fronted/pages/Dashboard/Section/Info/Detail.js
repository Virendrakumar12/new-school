import React from "react";
import { useSelector } from "react-redux";

const SectionDetails = () => {
  // Getting section details from redux store
  const { section } = useSelector((state) => state.section);
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 uppercase mb-4 md:mb-0">
          Section {section?.sectionName}
        </h2>
        <div className="text-lg text-gray-600 flex flex-col md:flex-row items-start md:items-center gap-2">
          <p className="font-medium text-gray-700">Class: {section?.classId?.className} ||</p>
          <p className="font-medium text-gray-700">Class Teacher: {section?.classTeacher?.firstName} {section?.classTeacher?.lastName}</p>
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Subjects</h3>
        <ul className="space-y-4">
          {section?.subjects?.map((subject, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
              <div className="flex items-center">
                <span className="font-medium text-lg">{subject?.subject?.subjectName}</span>
              </div>
              <div className="text-gray-600">
                Teacher: {subject?.teacher?.firstName} {subject?.teacher?.lastName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionDetails;
