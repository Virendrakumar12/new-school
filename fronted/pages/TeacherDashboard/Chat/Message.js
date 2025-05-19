import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '@/redux/Actions/StudentActions';

import { UserCircle } from 'lucide-react'; 
export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);
  

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  const startChat = (studentId) => {
    
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Teacher Dashboard - Students</h1>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id} className="mb-2 flex justify-between items-center">
              <span>{student.firstName}</span>
              <button
                className="px-4 py-1 bg-green-500 text-white rounded"
                onClick={() => startChat(student._id)}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
