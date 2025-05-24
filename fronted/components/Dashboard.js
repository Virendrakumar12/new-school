import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutSchool } from '@/redux/Slices/schoolSlice'

function Dashboard({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState(null)
  const router=useRouter();
  const dispatch=useDispatch();
  const { schoolInfo, loading, error } = useSelector((state) => state.schoolLogin);

  const handleLogout=()=>{
    dispatch(logoutSchool)
  }

  const menuItems = [
    {
      title: 'CLASS',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:"ADD CLASS",path:"/Dashboard/Class/AddClass"},
        {name:"VIEW cLASS",path:"/Dashboard/Class/ViewClass"},
       
        
      ]
    },

    {
      title: 'STUDENT MANAGEMENT',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:"DASHBOARD",path:"/Dashboard"},
        {name:"ADD STUDETN",path:"/Dashboard/Student/AddStudent"},
        {name:"STUDENT LIST",path:"/Dashboard/Student/StudentList"},
       
        
      ]
    },
    {
      title: 'TEACHER Management',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:"TEACHER LIST",path:"/Dashboard/Teacher/TeacherList"},
      ]
    },
    {
      title: 'SUBJECT Management',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:"subject manage",path:"/Dashboard/Subject/SubjectList"},
      ]
    },
    {
      title: ' FEE MANAGEMENT ',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      submenu: [
        {name:"STUDENT FEE",path:"/Dashboard/Student/StudentFee"}
      ]
    },
    {
      title: 'MESSAGE',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:" TEACHER MESSAGE",path:"/Dashboard/Chat/Message"},
      ]
    },
    {
      title: 'SCHOOL',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      submenu: [
        {name:" profile",path:"/Dashboard/School/Profile"},
        
      ]
    },
    
    
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
                className="w-full cursor-pointer flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
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
                      className="block px-12 py-2 text-sm cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-100"
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
            <div className="text-xl font-semibold text-gray-800">{` ${schoolInfo.school.schoolName}`}</div>
            <div className="text-xl font-semibold text-gray-800">{`Welcome Back ${schoolInfo.school.principal}`}</div>
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

export default Dashboard;
