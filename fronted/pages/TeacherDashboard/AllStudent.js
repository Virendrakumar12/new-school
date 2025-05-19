// pages/students/StudentList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '@/redux/Actions/StudentActions';
import { fetchClasses } from '@/redux/Actions/ClassActions';
import { getSectionsByClassId } from '@/redux/Actions/SectionActions';
import StudentTable from '@/components/studentTableClass';
import { setStudent } from '@/redux/Slices/StudentSlice';
import  getTeacherId  from '@/Utils/getTeacherId';
import { useState } from 'react';
import { useRouter } from 'next/router';
const StudentList = () => {
  const dispatch = useDispatch();
  const router=useRouter();

  const { students } = useSelector(state => state.student);
  const { classes } = useSelector(state => state.class);
  const { sections } = useSelector(state => state.section);
  
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  
const [searchTerm, setSearchTerm] = useState('');
const [teacherId, setTeacherId] = useState(null);
  console.log("teacher id",teacherId)
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
    const fetchTeacherId = async () => {
      const id = await getTeacherId();
      console.log("Fetched teacher ID:", id);
      setTeacherId(id);
    };
  
    fetchTeacherId();
  }, []);
  


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
    router.push("/Dashboard/Student/StudentInfo/StudentDetail")
    console.log('View student:', student);
    // Open modal or navigate to detail page
  };

  const handleEdit = (student) => {

    dispatch(setStudent(student))
    router.push("/Dashboard/Student/UpdateStudent")
    console.log('Edit student:', student);
    // Open edit form
  };

  const handleDelete = (student) => {
    console.log('Delete student:', student);
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

  

<StudentTable
  students={anyFilterApplied ? filteredStudents : students}
  teacherId={teacherId}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

</div>

  );
};

export default StudentList;
