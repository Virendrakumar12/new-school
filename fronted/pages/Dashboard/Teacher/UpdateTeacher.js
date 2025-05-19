import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTeacher,getTeacherById,deleteTeacher }from '@/redux/Actions/TeacherActions';
import { useRouter } from 'next/router';

const UpdateTeacherForm = () => {
  const dispatch = useDispatch();
  const router=useRouter();

  const { teacher } = useSelector((state) => state.teacher);
  console.log(teacher);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    salary: '',
    gender: '',
    dob: '',
    qualifications: '',
    experience: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
    },
  });


  const onClose=()=>{
       
    
  }
  // Pre-fill when teacher exists
  useEffect(() => {
    if (teacher) {
      setFormData({
        ...formData,
        ...teacher,
        dob: teacher?.dob?.substring(0, 10),
        address: {
          ...formData.address,
          ...teacher.address,
        },
      });
    }
    // eslint-disable-next-line
  }, [teacher]);
 const handleCancel=(e)=>{
    e.preventDefault();
   router.push("/Dashboard/Teacher/TeacherList")
 }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    dispatch(updateTeacher({ id: teacher._id, formData }));
    router.push("/Dashboard/Teacher/TeacherList")
    }
    catch(error){
        console.log(error)
    }
  };

  return (
    <div className=" flex items-center justify-center bg-pink-200 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
        
        <h2 className="text-xl font-semibold mb-4">Update Teacher</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border px-3 py-2 rounded" required />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border px-3 py-2 rounded" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2 rounded col-span-2" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border px-3 py-2 rounded" />
          <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" type="number" className="border px-3 py-2 rounded" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="border px-3 py-2 rounded col-span-2">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="border px-3 py-2 rounded col-span-2" />
          <input name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Qualifications" className="border px-3 py-2 rounded col-span-2" />
          <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="border px-3 py-2 rounded col-span-2" />
          <input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" className="border px-3 py-2 rounded col-span-2" />
          <input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" className="border px-3 py-2 rounded" />
          <input name="address.state" value={formData.address.state} onChange={handleChange} placeholder="State" className="border px-3 py-2 rounded" />
          <input name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Country" className="border px-3 py-2 rounded col-span-2" />
          <div className="flex justify-evenly gap-4 ml-24 pt-4">
        <button
          type="button"
          
          className="px-6 py-2 self-start bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 self-end-safe bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
      </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacherForm;
