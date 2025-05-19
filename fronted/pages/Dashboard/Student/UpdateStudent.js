'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStudent } from '@/redux/Actions/StudentActions';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchClasses } from '@/redux/Actions/ClassActions';
import { getSectionsByClassId } from '@/redux/Actions/SectionActions';


const UpdateStudentForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedClassId, setSelectedClassId] = useState('');
  const student = useSelector((state) => state.student.studentDetails);
console.log("studetn class id",student.currentSection.classId._id)

const { classes } = useSelector((state) => state.class);
 const { sections } = useSelector((state) => state.section);

useEffect(() => {
  if (selectedClassId) {
    dispatch(getSectionsByClassId(selectedClassId));
  }
}, [dispatch, selectedClassId]);

 useEffect(() => {
  dispatch(fetchClasses());
}, [dispatch]);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    dob: '',
    parentCode: '',
    aadhaarCard: '',
    admissionDate: '',
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    achievements: '',
    currentSection: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        phone: student.phone || '',
        email: student.email || '',
        gender: student.gender || '',
        dob: student.dob?.substring(0, 10) || '',
        parentCode: student.parentCode || '',
        aadhaarCard: student.aadhaarCard || '',
        admissionDate: student.admissionDate?.substring(0, 10) || '',
        bloodGroup: student.bloodGroup || '',
        allergies: student.allergies || '',
        medicalConditions: student.medicalConditions || '',
        achievements: student.achievements || '',
        currentSection: student.currentSection._id || '',
      });
      setSelectedClassId(student.currentSection?.classId?._id || ''); // ✅ Preload class
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("form data",formData)
  const res= await dispatch(updateStudent({ id: student._id, updatedData:formData }));
   if(res){
  alert("student updated successfully")
    router.push('/Dashboard/Student/StudentList');
    alert("student updated successfully")
   }
  };

  const handleCancel = () => {
    router.push('/Dashboard/Student/StudentList');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Student</h2>
          <button onClick={handleCancel} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['First Name', 'firstName'],
            ['Last Name', 'lastName'],
            ['Email', 'email', 'email'],
            ['Phone', 'phone'],
            ['Gender', 'gender'],
            ['Date of Birth', 'dob', 'date'],
            ['Parent Code', 'parentCode'],
            ['Aadhaar Card', 'aadhaarCard'],
            ['Admission Date', 'admissionDate', 'date'],
            ['Blood Group', 'bloodGroup'],
            ['Allergies', 'allergies'],
            ['Medical Conditions', 'medicalConditions'],
            ['Achievements', 'achievements'],
            
          ].map(([label, name, type = 'text']) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
           <div className="mb-3">
  <label className="block text-gray-700 mb-1">Current Section</label>
  <input
    readOnly
    name="currentSection"
    value={
      sections.find((s) => s._id === formData.currentSection)?.sectionName || ''
    }
    className="w-full p-2 rounded-md px-4 py-2 border border-gray-300 bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

        
         
<div className="mb-3"> <span className='  text-green-700 border border-gray-300 border-r-blue-500  shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'> change class</span>
  <label className="block text-gray-700 mb-1">Class</label>
  <select
    className="w-full border p-2 rounded-md"
    value={selectedClassId}
    onChange={(e) => {
      const selectedId = e.target.value;
      setSelectedClassId(selectedId);
      setFormData((prev) => ({ ...prev, currentSection: '' })); // Reset section
    }}
    
  >
    <option value="">Select Class</option>
    {classes?.map((cls) => (
      <option key={cls._id} value={cls._id}>
        {cls.className}
      </option>
    ))}
  </select>
</div>

<div className="mb-3"><span className='  text-green-700 border border-gray-300 border-r-blue-500  shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'> change section</span>
  <label className="block text-gray-700 mb-1">Section</label>
  <select
    className="w-full border p-2 rounded-md"
    value={formData.currentSection}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, currentSection: e.target.value }))
    }
    
  >
    <option value="">Select Section</option>
    {sections?.map((section) => (
      <option key={section._id} value={section._id}>
        {section.sectionName}
      </option>
    ))}
  </select>
</div>
 
          <div className="col-span-full flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Save className="w-4 h-4" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentForm;
