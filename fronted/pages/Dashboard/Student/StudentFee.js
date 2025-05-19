// pages/students/StudentList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents,deleteMonthlyPaymentsByStudent } from '@/redux/Actions/StudentActions';
import { fetchClasses } from '@/redux/Actions/ClassActions';
import { getSectionsByClassId } from '@/redux/Actions/SectionActions';
import StudentFee from '@/components/StudentFee';
import { setStudent } from '@/redux/Slices/StudentSlice';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Plus,X } from 'lucide-react';
const StudentList = () => {
  const dispatch = useDispatch();
  const router=useRouter();
const { enqueueSnackbar } = useSnackbar();
  const { students } = useSelector(state => state.student);
  const { classes } = useSelector(state => state.class);
  const { sections } = useSelector(state => state.section);
  
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [showModal, setShowModal] = useState(false); // For controlling the modal visibility
         const [actionType, setActionType] = useState(''); // To differentiate between Update and Delete actions
         const [selectedStudent, setSelectedStudent] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

  
const filteredStudents = students.filter(student => {
  const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
  const matchesSearch = searchTerm ? fullName.includes(searchTerm.toLowerCase()) : true;
  const matchesClass = selectedClassId ? student.currentSection?.classId?._id === selectedClassId : true;
  const matchesSection = selectedSectionId ? student.currentSection?._id === selectedSectionId : true;

  return matchesSearch && matchesClass && matchesSection;
});

const anyFilterApplied = searchTerm || selectedClassId || selectedSectionId;
  const filteredSections = selectedClassId
  ? sections.filter(sec => sec.classId._id === selectedClassId)
  : [];

  

  useEffect(() => {
    dispatch(getAllStudents());
   dispatch(fetchClasses());
  }, [dispatch]);
  
  useEffect(() => {
    if (selectedClassId) {
      dispatch(getSectionsByClassId(selectedClassId));
    }
  }, [dispatch, selectedClassId]);
  

 

  const handleView = (student) => {

    dispatch(setStudent(student))
   console.log(' fee table student:', student);
   router.push("/Dashboard/Student/StudentInfo/FetchFee")
  };
const handleAdd=(student)=>{
  
   dispatch(setStudent(student));
   console.log("i am at fee adding ")
   router.push("/Dashboard/Student/StudentFeeForm")
}
  const handleEdit = (student) => {

    dispatch(setStudent(student))
  
    console.log('Edit student:', student);
    // Open edit form
    router.push("/Dashboard/Student/UpdateFee")
  };

   const handleModalClose = () => {
      setShowModal(false); // Close the modal
      setSelectedStudent(null); // Reset the selected class
    };
  const handleActionConfirm = () => {
     console.log("selected section",selectedStudent._id)
     const studentId=selectedStudent._id;
  dispatch(deleteMonthlyPaymentsByStudent(studentId)).unwrap()
  
  .then(()=>{
    handleModalClose()
    enqueueSnackbar("Monthly fee deleted successfully!", { variant: "success" });
  })
  .catch(()=>{
    handleModalClose()
    enqueueSnackbar("failed to delete monthlyfee!", { variant: "error" });
  })
      ; // Close the modal after action
    };
  const handleDelete = (id) => {
     console.log("student id",id);
    setSelectedStudent(students.find((item) => item._id === id));
    setShowModal(true);
    // Confirm and delete
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">All Students</h2>
    <div className="flex gap-2 items-center">
    <select
      value={selectedClassId}
      onChange={(e) => {
        setSelectedClassId(e.target.value);
        setSelectedSectionId('');
      }}
      className="border p-2 rounded-md"
    >
      <option value="">Select Class</option>
      {classes.map(cls => (
        <option key={cls._id} value={cls._id}>{cls.className}</option>
      ))}
    </select>

    <select
      value={selectedSectionId}
      onChange={(e) => setSelectedSectionId(e.target.value)}
      className="border p-2 rounded-md"
    >
      <option value="">Select Section</option>
      {filteredSections.map(sec => (
        <option key={sec._id} value={sec._id}>{sec.sectionName}</option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 w-64 rounded-md"
    />
  </div>
  </div>

  

<StudentFee
  students={anyFilterApplied ? filteredStudents : students}
  onAdd={handleAdd}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
{/* Modal for Update/Delete */}
      {showModal && (
      <div className="absolute inset-0 z-[999] flex items-center justify-center ml-24 mt-12 mr-12 bg-white-200 bg-opacity-50">


          <div className="bg-white p-6 mt-0 rounded shadow-md w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={handleModalClose} // Close the modal when clicked
            >
              <X size={24} /> {/* Lucide X icon */}
            </button>

           
 
              <div>
                <p>Are you sure you want to delete {selectedStudent?.firstName}?</p>
                <button
                  className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded mt-4"
                  onClick={handleActionConfirm}
                >
                  Confirm Delete
                </button>
              </div>
            

            <button
              className="mt-4 ml-2 cursor-pointer text-gray-600"
              onClick={handleModalClose} // Close the modal when clicked
            >
              Cancel
            </button>
          </div>
        </div>
      )}
</div>

  );
};

export default StudentList;
