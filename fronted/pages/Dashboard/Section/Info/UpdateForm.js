import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "@/redux/Actions/TeacherActions";
import { getAllSubjects } from "@/redux/Actions/SubjectActions";
import { updateSection } from "@/redux/Actions/SectionActions";
import { useRouter } from "next/router";
export default function UpdateSection() {
  const dispatch = useDispatch();
  const router=useRouter();
  const { section } = useSelector((state) => state.section);
  const { teachers } = useSelector((state) => state.teacher);
  const { subjects } = useSelector((state) => state.subject);

  const [classTeacher, setClassTeacher] = useState("");
  const [subjectPairs, setSubjectPairs] = useState([]);

  useEffect(() => {
    dispatch(getAllTeachers());
    dispatch(getAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (section) {
      setClassTeacher(section.classTeacher || "");
      setSubjectPairs((section.subjects || []).map(pair => ({ ...pair })));

    }
  }, [section]);

  const handlePairChange = (index, key, value) => {
    const updated = subjectPairs.map((pair, i) =>
      i === index ? { ...pair, [key]: value } : pair
    );
    setSubjectPairs(updated);
  };
  
  const handleRemovePair = (index) => {
    const updated = [...subjectPairs];
    updated.splice(index, 1);
    setSubjectPairs(updated);
  };

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateSection({
          id: section._id,
          classTeacher:classTeacher,
          subjects: subjectPairs,
        })
      ).unwrap();

      alert("Section updated successfully.");
    router.push("/Dashboard/Section/SectionList")
    } catch (err) {
      console.error(err);
      alert("Error updating section.");
    }
  };

  if (!section) return <div>Loading section...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Update Section</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Section Name</label>
        <input
          type="text"
          value={section?.sectionName}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Class</label>
        <input
          type="text"
          value={section.classId?.className || "N/A"}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Class Teacher</label>
        <select
          value={classTeacher}
          onChange={(e) => setClassTeacher(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.firstName}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 mt-1 block">
          Current:{" "}
          <span className="text-gray-800 font-medium">{section.classTeacher?.firstName}</span>
         
          <strong>
         {  <span className="text-gray-800 font-medium">{section.classTeacher?.lastName}</span> ||
              "N/A"}
          </strong>
        </span>
      </div>

      <div className="mb-6">
      
        <h2 className="text-lg font-semibold mb-2">Subject–Teacher Pairs</h2>
        {subjectPairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2 items-center">
            <select
              value={pair.subject}
             
              onChange={(e) =>
                
                handlePairChange(index, "subject", e.target.value)
              }
              className="px-2 py-1 border rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                
                <option key={s._id} value={s._id}>
                  {s.subjectName}
                </option>
                
              ))}
            </select>
            <select
              value={pair.teacher}
              onChange={(e) =>
                handlePairChange(index, "teacher", e.target.value)
              }
              className="px-2 py-1 border rounded"
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.firstName}
                </option>
              ))}
            </select>
            <span
              onClick={() => handleRemovePair(index)}
              className="text-red-600 cursor-pointer text-sm hover:underline"
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <span
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Update Section
        </span>
      </div>
    </div>
  );
}

