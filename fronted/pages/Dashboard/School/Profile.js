
import React from 'react';
import {
  School,
  Mail,
  BadgeCheck,
  Users,
  BookOpen,
  UserCheck,
  ShieldCheck,
  KeyRound
} from 'lucide-react';

const SchoolInfo = () => {
  const school = {
    _id: "680f10c89f1820eeef131d7c",
    schoolName: "Sunrise Academy",
    email: "sunrise@example.com",
    password: "$2b$10$X/K3pteie2/VjkuLrrJeCOYG.aObrjMjWhLgL7pZDw1YdOL3YY1YS",
    code: "SRA001",
    students: [],
    teachers: [],
    classes: new Array(14),
    parents: [],
    principal: "Mrs. Alice Smith",
    status: "active",
    __v: 0,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <School className="text-blue-600 w-7 h-7" />
          <h2 className="text-2xl font-bold">{school.schoolName}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem icon={<BadgeCheck className="text-green-600 w-5 h-5" />} label="Code" value={school.code} />
          <InfoItem icon={<Mail className="text-purple-600 w-5 h-5" />} label="Email" value={school.email} />
          <InfoItem icon={<ShieldCheck className="text-yellow-600 w-5 h-5" />} label="Principal" value={school.principal} />
          <InfoItem icon={<KeyRound className="text-red-500 w-5 h-5" />} label="Status" value={school.status} />
          <InfoItem icon={<Users className="text-blue-500 w-5 h-5" />} label="Students" value={school.students.length} />
          <InfoItem icon={<UserCheck className="text-indigo-500 w-5 h-5" />} label="Teachers" value={school.teachers.length} />
          <InfoItem icon={<BookOpen className="text-pink-500 w-5 h-5" />} label="Classes" value={school.classes.length} />
          <InfoItem icon={<Users className="text-orange-500 w-5 h-5" />} label="Parents" value={school.parents.length} />
        </div>

        <div className="text-sm text-gray-400 text-right pt-4">
          ID: {school._id}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

export default SchoolInfo;
