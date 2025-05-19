import { useRouter } from 'next/router'
import { useState } from 'react'


function TeacherDashboard({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState(null)
  const router=useRouter();
  const [schoolStats, setSchoolStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    classCount: 0,
    parentCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 /* useEffect(() => {
    const fetchSchoolStats = async () => {
      try {
        const response = await fetch('/api/admin/school-stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch school statistics');
        }

        const data = await response.json();
        setSchoolStats(data);
      } catch (err) {
        setError('Failed to load school statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
    */
  

  const menuItems = [
   
    {
      title: 'Student Management',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
      {name:"studentList",path:"/TeacherDashboard/AllStudent"}
        
      ]
    },
    
    {
      title: 'message',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      submenu: [
        {name:"student message",path:"/TeacherDashboard/Chat/Message"}
      ]
    },
    {
      title: 'school message',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      submenu: [
        {name:"school message",path:"/TeacherDashboard/SchoolMessage"}
      ]
    },
    {
      title: 'Administrative',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      submenu: ['Settings', 'Reports', 'User Management', 'Logs']
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div
  className={`fixed md:static z-50 w-72 bg-white shadow-xl h-full transform transition-transform duration-150 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
>

        <div className="p-4 border-b bg-blue-600 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">School Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:text-blue-200 focus:outline-none md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
    
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.title}</span>
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeMenu === index && (
                <div className="bg-blue-50 py-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => router.push(subItem.path)}
                      className="block px-12 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100"
                    >
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
 
      

      <div className={`flex-1 overflow-auto ${!isSidebarOpen ? 'md:ml-0' : 'md:ml-22'}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-xl font-semibold text-gray-800">Welcome Back, Admin</div>
          </div>
        </header>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto mt-16 md:mt-0 p-4 z-10 relative">
  {children}
</div>

      </div>
    </div>
  )
}

export default TeacherDashboard;
