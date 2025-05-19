import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubjects } from '@/redux/Actions/SubjectActions';
import { getAllTeachers } from '@/redux/Actions/TeacherActions';
import { assignSubjectToSection } from '@/redux/Actions/SectionActions';
import { setSection } from '@/redux/Slices/sectionSlice';
import { useRouter } from 'next/router';


const AddSubjectsToSection = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teacher);
  const { section } = useSelector((state) => state.section);

  const [subjectTeacherPairs, setSubjectTeacherPairs] = useState([
    { subject: '', teacher: '' }
  ]);

  useEffect(() => {
     if (!section || !section._id) {
          const saved = localStorage.getItem("selectedSection");
          if (saved) {
            dispatch(setSection(JSON.parse(saved)));
          }
        }
      
    dispatch(getAllSubjects());
    dispatch(getAllTeachers());
  }, [dispatch,section]);

  const handleChange = (index, field, value) => {
    const updated = [...subjectTeacherPairs];
    updated[index][field] = value;
    setSubjectTeacherPairs(updated);
  };

  const addPair = () => {
    setSubjectTeacherPairs([...subjectTeacherPairs, { subject: '', teacher: '' }]);
  };

  const removePair = (index) => {
    const updated = subjectTeacherPairs.filter((_, i) => i !== index);
    setSubjectTeacherPairs(updated);
  };

  const handleSubmit = () => {
    const validPairs = subjectTeacherPairs.filter(
      (pair) => pair.subject && pair.teacher
    );

    if (validPairs.length === 0) return alert('Please add at least one subject-teacher pair.');
    if (!section || !section._id) {
        return <p>Loading section data...</p>; // or a skeleton loader
      }
    validPairs.forEach((pair) => {
        
        dispatch(assignSubjectToSection({
          sectionId: section._id,
          subjectId: pair.subject,
          teacherId: pair.teacher,
        }));
      });
      

    alert('Subjects assignment initiated!');
    router.push("/Dashboard/Section/SectionList")
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Assign Subjects and Teachers</h2>

      {subjectTeacherPairs.map((pair, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-4 items-center mb-4 border-b pb-4"
        >
          <select
            className="w-full sm:w-1/2 p-2 border rounded"
            value={pair.subject}
            onChange={(e) => handleChange(index, 'subject', e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.subjectName}
              </option>
            ))}
          </select>

          <select
            className="w-full sm:w-1/2 p-2 border rounded"
            value={pair.teacher}
            onChange={(e) => handleChange(index, 'teacher', e.target.value)}
          >
            <option value="">Select Teacher</option>
            {teachers?.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>

          <button
            onClick={() => removePair(index)}
            className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
          >
            &#10005;
          </button>
        </div>
      ))}

      <button
        onClick={addPair}
        className="text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        + Add More
      </button>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  );
};

export default AddSubjectsToSection;
