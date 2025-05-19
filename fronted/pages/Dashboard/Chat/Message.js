import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '@/redux/Actions/TeacherActions';

import { useContext } from 'react';
import { SocketContext } from '@/context/SocketContext';

import { useRouter } from 'next/router';
import { UserCircle } from 'lucide-react';  // Lucide icon
import ChatBox from '@/components/ChatBox';
export default function SchoolDashboard() {
  const dispatch = useDispatch();
  
  const { teachers, loading } = useSelector((state) => state.teacher);
  const {schoolInfo}=useSelector((state)=>state.schoolLogin)

  
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const[school,setSchool]=useState(null);
  const socket = useContext(SocketContext);
  const [onlineStatus, setOnlineStatus] = useState({});
  console.log("teacher at school dasdh board",teachers)
  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);


  useEffect(() => {
    setSchool(schoolInfo);
  }, [schoolInfo]);

  useEffect(() => {
    if (socket) {
      socket.on('onlineStatus', ({ userId, status }) => {
        console.log('Received onlineStatus:', userId, status);
        setOnlineStatus((prev) => ({
          ...prev,
          [userId]: status === 'online',
        }));
      });
    }
  
    return () => {
      if (socket) {
        socket.off('onlineStatus');
      }
    };
  }, [socket]);
 
 

 const startChat = (teacher) => {
    console.log("Teacher clicked:", teacher);  // Log the selected teacher
    if (teacher) {
      setSelectedTeacher(teacher);  // Set selected teacher only if teacher object is valid
    } else {
      console.log("No teacher selected");
    }
  }
  useEffect(() => {
    console.log("Selected teacher changed:", selectedTeacher); // Log state change
  }, [selectedTeacher]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">School Dashboard</h1>

      {loading ? (
        <p>Loading teachers...</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Teachers</h2>

          {/* Horizontal Scrollable Circle List */}
          <div className="flex overflow-x-auto space-x-4 pb-4">
  {teachers.map((teacher) => (
    <div
      key={teacher._id}
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
      onClick={() => startChat(teacher)}
    >
      <div
        className={`w-16 h-16 rounded-full border-4 ${
          onlineStatus[teacher._id] ? 'border-green-500' : 'border-red-500'
        } flex items-center justify-center bg-gray-100`}
      >
        <UserCircle className="w-12 h-12 text-gray-500" />
      </div>
      <span className="mt-1 text-sm text-center">{teacher.firstName}</span>
    </div>
  ))}
</div>

        
        </div>
      )}
 {selectedTeacher && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">
                        Chat with {selectedTeacher.firstName}
                        
                    </h2>
                    <ChatBox
                        receiverId={selectedTeacher._id}
                        receiverType="Teacher"
                        currentUserId={schoolInfo.school.id}
                        currentUserType="School"
                    />
                </div>
            )}

    </div>
  );
}
