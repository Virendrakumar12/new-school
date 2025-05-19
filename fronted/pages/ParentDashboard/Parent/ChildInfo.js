import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsByParentId } from "@/redux/Actions/ParentActions";
import ParentStudentCard from "@/components/ParentStudent"; // path to your card component
import { setStudent } from '@/redux/Slices/StudentSlice';
import { useRouter } from "next/router";
const ParentChild = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  // Get parent info and student list from Redux store
  const parent = useSelector((state) => state.parent.parent); // parent is logged in
  const { parentStudents=[], loading, error } = useSelector((state) => state.parent);

  // Fetch students for the logged-in parent
  useEffect(() => {
    if (parent?._id) {
      dispatch(fetchStudentsByParentId(parent._id));
    }
  }, [parent, dispatch]);

const handleFee=(student)=>{
 
  console.log(student);
}
const handleView=(student)=>{
   dispatch(setStudent(student))
     
    
router.push("/ParentDashboard/Parent/StudentPay")
   
  
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Children</h1>

      {loading && <p className="text-blue-600">Loading students...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && parentStudents.length === 0 && (
        <p className="text-gray-500">No students found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parentStudents.map((student) => (
          <ParentStudentCard
            key={student._id}
            student={student}
            onViewDetails={handleView}
            onViewFees={handleFee}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentChild;
