import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '@/redux/Actions/TeacherActions';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { assignClassTeacher } from '@/redux/Actions/SectionActions';
import { setSection } from '@/redux/Slices/sectionSlice';
const ClassTeacherSelect = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
 const router=useRouter();
  const { teachers, loading } = useSelector((state) => state.teacher);
  const { section } = useSelector((state) => state.section); 
 
useEffect(() => {
    if (!section || !section._id) {
      const saved = localStorage.getItem("selectedSection");
      if (saved) {
        dispatch(setSection(JSON.parse(saved)));
      }
    }
  
    dispatch(getAllTeachers());
  }, [dispatch,section]);

  const handleTeacherChange = (e) => {
    const selectedTeacherId = e.target.value;
    
    // update section state with new classTeacher
   
    
    dispatch(assignClassTeacher({sectionId:section._id,classTeacher:selectedTeacherId})).unwrap();
    enqueueSnackbar("classTeacher assign successfully!", { variant: "success" })
    router.push("/Dashboard/Section/SectionList");

  };

  return (
    <div className="w-full max-w-md mx-auto my-4 px-2">
      <label className="block text-gray-700 font-semibold mb-2">
        Select Class Teacher
      </label>
      <div className="relative">
        <select
          value={section?.classTeacher || ''}
          onChange={handleTeacherChange}
          className="block w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
        >
          <option value="">-- Choose a Teacher --</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : (
            teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName}
              </option>
            ))
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l6 6a1 1 0 11-1.414 1.414L10 5.414 4.707 10.707a1 1 0 01-1.414-1.414l6-6A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClassTeacherSelect;
