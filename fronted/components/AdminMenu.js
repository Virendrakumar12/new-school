import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
  FaBookOpen,
  FaCog
} from 'react-icons/fa';

const AdminMenu = ({ activeTab, setActiveTab, isMenuCollapsed }) => {
  const [current, setCurrent] = useState(activeTab);

  const teachersSubmenu = (
    <Menu>
      <Menu.Item key="addTeacher">
        <Link to="/admin/teachers/add">Add New Teacher</Link>
      </Menu.Item>
      <Menu.Item key="viewTeachers">
        <Link to="/admin/teachers">View All Teachers</Link>
      </Menu.Item>
      <Menu.Item key="assignSubjects">
        <Link to="/admin/teachers/subjects">Assign Subjects</Link>
      </Menu.Item>
      <Menu.Item key="assignClassTeacher">
        <Link to="/admin/teachers/class-teacher">Assign Class Teacher</Link>
      </Menu.Item>
    </Menu>
  );

  const classesSubmenu = (
    <Menu>
      <Menu.Item key="addClass">
        <Link to="/admin/classes/add">Add New Class</Link>
      </Menu.Item>
      <Menu.Item key="viewClasses">
        <Link to="/admin/classes">View All Classes</Link>
      </Menu.Item>
      <Menu.Item key="manageSections">
        <Link to="/admin/classes/sections">Manage Sections</Link>
      </Menu.Item>
      <Menu.Item key="assignSubjects">
        <Link to="/admin/classes/subjects">Assign Subjects</Link>
      </Menu.Item>
    </Menu>
  );

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className={`admin-menu h-full ${isMenuCollapsed ? 'w-16' : 'w-64'}`}>
      <Menu
        onClick={handleClick}
        selectedKeys={[activeTab]}
        mode="inline"
        theme="dark"
        className="h-full"
      >
        <Menu.Item key="dashboard" icon={<FaCog />} onClick={() => setActiveTab('dashboard')}>
          {!isMenuCollapsed && <span>Dashboard</span>}
        </Menu.Item>

        <Dropdown overlay={classesSubmenu} placement="rightTop" trigger={['hover']}>
          <Menu.Item key="classes" icon={<FaBookOpen />}>
            {!isMenuCollapsed && <span>Classes</span>}
          </Menu.Item>
        </Dropdown>

        <Dropdown overlay={teachersSubmenu} placement="rightTop" trigger={['hover']}>
          <Menu.Item key="teachers" icon={<FaChalkboardTeacher />}>
            {!isMenuCollapsed && <span>Teachers</span>}
          </Menu.Item>
        </Dropdown>

        <Menu.Item key="students" icon={<FaUserGraduate />} onClick={() => setActiveTab('students')}>
          {!isMenuCollapsed && <span>Students</span>}
        </Menu.Item>

        <Menu.Item key="parents" icon={<FaUserFriends />} onClick={() => setActiveTab('parents')}>
          {!isMenuCollapsed && <span>Parents</span>}
        </Menu.Item>

        <Menu.Item key="users" icon={<FaUsers />} onClick={() => setActiveTab('users')}>
          {!isMenuCollapsed && <span>Users</span>}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminMenu;