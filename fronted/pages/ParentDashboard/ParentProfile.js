import React from "react";
import { useSelector } from "react-redux";
import { UserCircle } from "lucide-react";

const ParentProfile = () => {
  const parent = useSelector((state) => state.parent.parent); // adjust key if needed
 
  if (!parent) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        No parent data found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-2xl rounded-2xl mt-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <UserCircle className="text-blue-600 w-20 h-20" />
        <h2 className="text-3xl font-bold text-gray-800">Parent Profile</h2>
        <p className="text-sm text-gray-500 italic">
          Status:{" "}
          <span className="text-green-600 font-semibold">
            {parent.status || "Active"}
          </span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="font-semibold">Father's Name</p>
          <p>{parent.fatherName}</p>
        </div>
        <div>
          <p className="font-semibold">Mother's Name</p>
          <p>{parent.motherName}</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p>{parent.email}</p>
        </div>
        <div>
          <p className="font-semibold">Parent Code</p>
          <p>{parent.parentCode}</p>
        </div>
        <div>
          <p className="font-semibold">Aadhaar Card</p>
          <p>{parent.aadhaarCard}</p>
        </div>
        <div>
          <p className="font-semibold">Occupation</p>
          <p>{parent.occupation}</p>
        </div>
        <div>
          <p className="font-semibold">Phone</p>
          <p>{parent.phone}</p>
        </div>
        <div>
          <p className="font-semibold">Address</p>
          <p>
            {parent.address?.street}, {parent.address?.city},{" "}
            {parent.address?.state}, {parent.address?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
