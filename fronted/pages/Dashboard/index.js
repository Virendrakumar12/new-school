import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolDashboardCounts } from "@/redux/Actions/School/SchoolActions";

const HomeCard = () => {
  const dispatch = useDispatch();
  

  const { dashboardCounts, loading, error } = useSelector((state) => state.schoolLogin);
 console.log("dasjbaoard count",dashboardCounts.totalTeachers)
  const [schoolStats, setSchoolStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    
    parentCount: 0,
  });

  useEffect(() => {
    dispatch(getSchoolDashboardCounts());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardCounts) {
      setSchoolStats({
        studentCount: dashboardCounts.totalStudents || 0,
        teacherCount: dashboardCounts.totalTeachers || 0,
         parentCount: dashboardCounts.totalParents || 0,
      });
    }
  }, [dashboardCounts]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="p-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Count */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h3 className="text-white text-sm font-medium opacity-80">Total Students</h3>
            <p className="text-3xl font-bold mt-2">{schoolStats.studentCount}</p>
            <div className="flex items-center text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +12% from last month
            </div>
          </div>

          {/* Teacher Count */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h3 className="text-white text-sm font-medium opacity-80">Total Teachers</h3>
            <p className="text-3xl font-bold mt-2">{schoolStats.teacherCount}</p>
            <div className="flex items-center text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +8% from last month
            </div>
          </div>

          {/* Class Count */}
          

          {/* Parent Count */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h3 className="text-white text-sm font-medium opacity-80">Total Parents</h3>
            <p className="text-3xl font-bold mt-2">{schoolStats.parentCount}</p>
            <div className="flex items-center text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +5% from last month
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeCard;
