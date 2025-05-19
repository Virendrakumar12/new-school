import React from "react";
import { useSelector } from "react-redux";
import {
  User,
  Calendar,
  Phone,
  Mail,
  Fingerprint,
  Landmark,
  HeartPulse,
  Award,
  BadgeCheck,
  School,
  Layers,
} from "lucide-react";

const StudentInfoPage = () => {
  const { studentDetails } = useSelector((state) => state.student);
  
  if (!studentDetails) {
    return (
      <p className="text-center text-gray-500 mt-10">No student data found.</p>
    );
  }

  const {
    firstName,
    lastName,
    gender,
    dob,
    phone,
    email,
    aadhaarCard,
    registrationNumber,
    admissionDate,
    bloodGroup,
    allergies,
    medicalConditions,
    achievements,
    status,
    schoolId,
    parentCode,
    currentSection,
    parent,
  } = studentDetails;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl space-y-10">
      {/* 🧑 Personal Information */}
      <section>
        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Full Name" value={`${firstName} ${lastName}`} />
          <Info label="Gender" value={gender} capitalize />
          <Info
            label="Date of Birth"
            value={new Date(dob).toLocaleDateString()}
            icon={<Calendar className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Phone"
            value={phone}
            icon={<Phone className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Email"
            value={email}
            icon={<Mail className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Aadhaar Card"
            value={aadhaarCard}
            icon={<Fingerprint className="w-4 h-4 text-gray-600" />}
          />
        </div>
      </section>

      {/* 🏫 Academic Info */}
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <School className="w-5 h-5" /> Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info
            label="Registration Number"
            value={registrationNumber}
            icon={<BadgeCheck className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Admission Date"
            value={new Date(admissionDate).toLocaleDateString()}
            icon={<Calendar className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Current Section"
            value={currentSection?.sectionName || "N/A"}
            icon={<Layers className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="Current Section"
            value={currentSection?.classId?.className || "N/A"}
            icon={<Layers className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="class Teacher"
            value={currentSection?.classTeacher?.firstName|| "N/A"}
            icon={<Landmark className="w-4 h-4 text-gray-600" />}
          />
          <Info
            label="School"
            value={schoolId?.schoolName || "N/A"}
            icon={<Landmark className="w-4 h-4 text-gray-600" />}
          />
        </div>
      </section>

      {/* 👨‍👩‍👧 Parent Info */}
      <section>
        <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Parent Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Parent Code" value={parentCode} />
          <Info label="Parent Name" value={parent?.fatherName || "N/A"} />
          <Info label="Parent Phone" value={parent?.motherName || "N/A"} />
          <Info label="Parent Phone" value={parent?.phone || "N/A"} />
        </div>
      </section>

      {/* 🩺 Health & Achievements */}
      <section>
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <HeartPulse className="w-5 h-5" /> Medical & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Blood Group" value={bloodGroup || "N/A"} />
          <Info label="Allergies" value={allergies || "None"} />
          <Info label="Medical Conditions" value={medicalConditions || "None"} />
          <Info
            label="Achievements"
            value={achievements || "None"}
            icon={<Award className="w-4 h-4 text-gray-600" />}
          />
        </div>
      </section>

      {/* 🟢 Status */}
      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5" /> Status
        </h2>
        <p
          className={`text-lg font-semibold ${
            status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </section>
    </div>
  );
};

const Info = ({ label, value, icon = null, capitalize = false }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`text-lg flex items-center gap-2 ${
        capitalize ? "capitalize" : ""
      }`}
    >
      {icon}
      {value}
    </p>
  </div>
);

export default StudentInfoPage;
