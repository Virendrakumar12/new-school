import React from "react";
import { useSelector } from "react-redux";
import {
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  BadgeCheck,
  School,
  BadgePlus,
  Banknote,
} from "lucide-react";

const TeacherInfoCard = () => {
  const { teacher } = useSelector((state) => state.teacher);
  
  if (!teacher) {
    return <p className="text-center text-gray-500 mt-10">No teacher data found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-8">
      {/* 📘 1. Personal Information */}
      <section>
        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{teacher.firstName} {teacher.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-lg capitalize">{teacher.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              {new Date(teacher.dob).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" /> {teacher.phone || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" /> {teacher.email}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              {`${teacher.address?.street || ""}, ${teacher.address?.city || ""}, ${teacher.address?.state || ""}, ${teacher.address?.country || ""}`}
            </p>
          </div>
        </div>
      </section>

      {/* 📗 2. Professional Details */}
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <School className="w-5 h-5" /> Professional Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Teacher Code</p>
            <p className="text-lg flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-gray-600" /> {teacher.code}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">School</p>
            <p className="text-lg">{teacher.schoolId?.schoolName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="text-lg">{new Date(teacher.joiningDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="text-lg">{teacher.experience || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Specializations</p>
            <p className="text-lg">{teacher.specializations?.join(", ") || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Qualifications</p>
            <p className="text-lg">{teacher.qualifications || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Status</p>
            <p className="text-lg flex items-center gap-2">
              <BadgePlus className={`w-4 h-4 ${teacher.isActive ? "text-green-600" : "text-red-600"}`} />
              {teacher.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </section>

      {/* 📙 3. Financial Info (Optional) */}
      {teacher.salary && (
        <section>
          <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <Banknote className="w-5 h-5" /> Financial Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-lg font-semibold">₹ {teacher.salary}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TeacherInfoCard;



