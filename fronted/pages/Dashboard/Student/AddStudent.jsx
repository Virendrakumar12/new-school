import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createParent } from '@/redux/Actions/ParentActions';
import { createStudent } from '@/redux/Actions/StudentActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchClasses } from '@/redux/Actions/ClassActions';
import { getSectionsByClassId } from '@/redux/Actions/SectionActions';




const StudentParentForm = () => {
  const dispatch = useDispatch();
 const router=useRouter();
 const [selectedClassId, setSelectedClassId] = useState('');
 const [savedParent, setSavedParent] = useState(null);
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



  const [parentData, setParentData] = useState({
    fatherName: '',
    motherName: '',
    email: '',
    aadhaarCard: '',
    occupation: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const [studentData, setStudentData] = useState({
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

  

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    if (name in parentData.address) {
      setParentData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setParentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParentSubmit = async (e) => {
    e.preventDefault();
    try {
      const parentResponse = await dispatch(createParent(parentData));
      const { parentCode,fatherName} = parentResponse.payload;
      console.log(parentCode);
      setSavedParent(parentCode);

      alert('Parent data saved. You can now fill in student data.');
    } catch (error) {
      console.error('Parent Submission Error:', error);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!savedParent) {
      alert('Please submit parent data first.');
      return;
    }

    try {
      const studentPayload = {
        ...studentData,
        parentCode: savedParent,
        
      };
      await dispatch(createStudent(studentPayload));
      alert('Student data submitted successfully.');
      router.push("/Dashboard/Student/StudentList");
    } catch (error) {
      console.error('Student Submission Error:', error);
    }
  };

  return (
    <div className="w-full p-4 space-y-6">
      {/* Parent Form */}
      <form onSubmit={handleParentSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Parent Information</h2>
        
        {['fatherName', 'motherName', 'email', 'aadhaarCard', 'occupation', 'phone'].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={field}
              value={parentData[field]}
              onChange={handleParentChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        ))}

        {['street', 'city', 'state', 'country'].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 capitalize mb-1">Address {field}</label>
            <input
              type="text"
              name={field}
              value={parentData.address[field]}
              onChange={handleParentChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        ))}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit Parent Info
        </button>
      </form>

      {/* Student Form */}
      <form onSubmit={handleStudentSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Student Information</h2>
        
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Parent code</label>
          <input
            name="parentCode"
            value={savedParent}
            
            className="w-full border p-2 rounded-md"
            onChange={(e)=>{
              setSavedParent(e.target.value);
            }}
            required
          />
        </div>
        {['firstName', 'lastName', 'phone', 'email', 'gender', 'aadhaarCard', 'bloodGroup'].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={field}
              value={studentData[field]}
              onChange={handleStudentChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleStudentChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Admission Date</label>
          <input
            type="date"
            name="admissionDate"
            value={studentData.admissionDate}
            onChange={handleStudentChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Allergies</label>
          <textarea
            name="allergies"
            value={studentData.allergies}
            onChange={handleStudentChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Medical Conditions</label>
          <textarea
            name="medicalConditions"
            value={studentData.medicalConditions}
            onChange={handleStudentChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Achievements</label>
          <input
            name="achievements"
            value={studentData.achievements}
            onChange={handleStudentChange}
            className="w-full border p-2 rounded-md"
          />
        </div>


        <div className="mb-3">
  <label className="block text-gray-700 mb-1">Class</label>
  <select
    className="w-full border p-2 rounded-md"
    value={selectedClassId}
    onChange={(e) => {
      const selectedId = e.target.value;
      setSelectedClassId(selectedId);
      setStudentData((prev) => ({ ...prev, currentSection: '' })); // Reset section
    }}
    required
  >
    <option value="">Select Class</option>
    {classes?.map((cls) => (
      <option key={cls._id} value={cls._id}>
        {cls.className}
      </option>
    ))}
  </select>
</div>

<div className="mb-3">
  <label className="block text-gray-700 mb-1">Section</label>
  <select
    className="w-full border p-2 rounded-md"
    value={studentData.currentSection}
    onChange={(e) =>
      setStudentData((prev) => ({ ...prev, currentSection: e.target.value }))
    }
    required
  >
    <option value="">Select Section</option>
    {sections?.map((section) => (
      <option key={section._id} value={section._id}>
        {section.sectionName}
      </option>
    ))}
  </select>
</div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Student Info
        </button>
      </form>
    </div>
  );
};

export default StudentParentForm;
