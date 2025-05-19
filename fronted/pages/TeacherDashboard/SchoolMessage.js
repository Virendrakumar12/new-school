import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '@/components/ChatBox';
import getSchoolIdFromToken from '@/Utils/getSchoolId';


export default function TeacherDashboard() {
  const { teacher } = useSelector((state) => state.teacher); 
   // ✅ updated slice path

  
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        let schoolId = null;

        // Try to get from Redux first
        if (teacher && teacher.schoolId) {
          schoolId = teacher.schoolId;
          setSchool(schoolId);
        } else {
          // Fallback: decode from token
          schoolId = getSchoolIdFromToken();
          setSchool(schoolId);
        }

        if (!schoolId) {
          console.error('No schoolId found');
          setIsLoading(false);
          return;
        }

        
        
      } catch (error) {
        console.error('Failed to fetch school details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchool();
  }, [teacher]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center animate-pulse">
          <p className="text-lg text-gray-600">Loading your school chat...</p>
        </div>
      </div>
    );
  }

  if (!teacher || !school) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-600">Failed to load teacher or school details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Welcome, {teacher.name || 'Teacher'}!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You are connected to: <span className="font-semibold">{school.schoolName}</span>
        </p>

        <div className="border-t pt-4">
          <ChatBox
            receiverId={school}
            receiverType="School"
            currentUserId={teacher.id}
            currentUserType="Teacher"
          />
        </div>
      </div>
    </div>
  );
}
