import React, { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser, updateUser } from '@/services/userServices';
import AdminMenu from '@/components/AdminMenu';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaUserFriends, FaCalendarAlt, FaBookOpen, FaCog, FaUsers, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [metrics, setMetrics] = useState({
    dues: { amount: 64750, count: 27 },
    totalIncome: 5000,
    monthlyIncome: 5000,
    todayIncome: 0,
    monthlyProfit: 5000,
    yearlyExpense: 0,
    monthlyExpense: 0,
    todayExpense: 0,
    totalStudents: { total: 8, boys: 7, girls: 1 },
    totalParents: 10
  });

  useEffect(() => {
    loadUsers(activeTab);
  }, [activeTab]);

  const loadUsers = async (userType) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUsers(userType);
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      setUserError(error.message || 'Failed to load users');
      setError('Error occurred while loading users. Please try again.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setIsLoading(true);
      await deleteUser(activeTab, userId);
      await loadUsers(activeTab);
      setError(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const MetricCard = ({ title, value, bgColor, icon: Icon }) => (
    <div className={`${bgColor} rounded-lg p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-105`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {Icon && <Icon className="text-3xl opacity-80" />}
      </div>
      <button className="mt-2 text-sm opacity-80 hover:opacity-100">More info</button>
    </div>
  );

  const renderUserTable = () => {
    if (isLoading) {
      return <div className="text-center">Loading...</div>;
    }

    if (userError) {
      return (
        <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">
          <p className="font-semibold mb-2">Error Loading {activeTab}</p>
          <p>{userError}</p>
          <button
            onClick={() => loadUsers(activeTab)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              {activeTab === 'teachers' && <th className="px-6 py-3 border-b">Subject</th>}
              {activeTab === 'students' && <th className="px-6 py-3 border-b">Grade</th>}
              {activeTab === 'parents' && <th className="px-6 py-3 border-b">Student</th>}
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{user.name}</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                {activeTab === 'teachers' && <td className="px-6 py-4 border-b">{user.subject}</td>}
                {activeTab === 'students' && <td className="px-6 py-4 border-b">{user.grade}</td>}
                {activeTab === 'parents' && <td className="px-6 py-4 border-b">{user.student}</td>}
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 mr-2"
                  >
                    Delete
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          {isMenuCollapsed ? '☰' : '×'}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`bg-gray-800 text-white fixed md:relative z-50 h-full ${isMenuCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 w-64'} transition-all duration-300`}>
        <AdminMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMenuCollapsed={isMenuCollapsed}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <MetricCard title="Total Students" value={metrics.totalStudents.total} bgColor="bg-blue-500" icon={FaUserGraduate} />
            <MetricCard title="Total Parents" value={metrics.totalParents} bgColor="bg-green-500" icon={FaUserFriends} />
            <MetricCard title="Monthly Income" value={`₹${metrics.monthlyIncome}`} bgColor="bg-purple-500" icon={FaMoneyBillWave} />
            <MetricCard title="Monthly Profit" value={`₹${metrics.monthlyProfit}`} bgColor="bg-yellow-500" icon={FaChartLine} />
          </div>
        )}
        {(activeTab === 'students' || activeTab === 'teachers' || activeTab === 'parents') && renderUserTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;