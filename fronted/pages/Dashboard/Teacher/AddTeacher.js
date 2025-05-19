import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeacher }from '@/redux/Actions/TeacherActions';
import {
  User, Mail, Lock, Phone, CalendarDays, MapPin, GraduationCap, BookOpen, Briefcase, Users, ShieldCheck
} from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


const InputField = ({ icon: Icon, ...props }) => (
  <div className="flex items-center border rounded-md px-3 py-2 gap-2 bg-white shadow-sm">
    <Icon className="text-gray-500 w-5 h-5" />
    <input {...props} className="w-full outline-none" />
  </div>
);

const AddTeacherForm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router=useRouter();
  
  const { isLoading, isSuccess, isError, errorMessage, successMessage } = useSelector(state => state.teacher);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    dob: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
    },
    joiningDate: new Date().toISOString().split('T')[0],
    qualifications: '',
    specializations: '',
    experience: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    const formattedData = {
      ...formData,
      specializations: formData.specializations.split(',').map(s => s.trim()),
    };
    console.log('Submitting:', formattedData);
 const res = dispatch(createTeacher(formattedData)).unwrap();
 if(isSuccess){
     enqueueSnackbar(successMessage, { variant: "success" })
     router.push("/Dashboard/Teacher/TeacherList")
 }
  }
 catch(error){
     enqueueSnackbar(error,{variant:"error"})
}
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
    <h2 className="text-3xl font-bold text-blue-700 mb-6">Register New Teacher</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
      {/* First Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-gray-700 font-medium">First Name</label>
        <InputField icon={User} type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
      </div>
  
      {/* Last Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</label>
        <InputField icon={User} type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
      </div>
  
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
        <InputField icon={Mail} type="email" name="email" placeholder="Email" required onChange={handleChange} />
      </div>
  
      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
        <InputField icon={Lock} type="password" name="password" placeholder="Password" required onChange={handleChange} />
      </div>
  
      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-gray-700 font-medium">Phone</label>
        <InputField icon={Phone} type="tel" name="phone" placeholder="Phone (10–15 digits)" onChange={handleChange} />
      </div>
  
      {/* Gender */}
      <div className="flex flex-col gap-1">
        <label htmlFor="gender" className="text-gray-700 font-medium">Gender</label>
        <div className="flex items-center border rounded-md px-3 py-2 gap-2 shadow-sm bg-white">
          <Users className="text-gray-500 w-5 h-5" />
          <select name="gender" id="gender" required onChange={handleChange} className="w-full outline-none bg-transparent">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
  
      {/* Date of Birth */}
      <div className="flex flex-col gap-1">
        <label htmlFor="dob" className="text-gray-700 font-medium">Date of Birth</label>
        <div className="flex items-center border rounded-md px-3 py-2 gap-2 shadow-sm bg-white">
          <CalendarDays className="text-gray-500 w-5 h-5" />
          <input
            type="date"
            name="dob"
            id="dob"
            required
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>
  
      {/* Joining Date */}
      <div className="flex flex-col gap-1">
        <label htmlFor="joiningDate" className="text-gray-700 font-medium">Joining Date</label>
        <div className="flex items-center border rounded-md px-3 py-2 gap-2 shadow-sm bg-white">
          <CalendarDays className="text-gray-500 w-5 h-5" />
          <input
            type="date"
            name="joiningDate"
            id="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>
  
      {/* Qualifications */}
      <div className="flex flex-col gap-1">
        <label htmlFor="qualifications" className="text-gray-700 font-medium">Qualifications</label>
        <InputField icon={GraduationCap} type="text" name="qualifications" placeholder="Qualifications" onChange={handleChange} />
      </div>
  
      {/* Specializations */}
      <div className="flex flex-col gap-1">
        <label htmlFor="specializations" className="text-gray-700 font-medium">Specializations</label>
        <InputField icon={BookOpen} type="text" name="specializations" placeholder="Specializations (comma separated)" onChange={handleChange} />
      </div>
  
      {/* Experience */}
      <div className="flex flex-col gap-1">
        <label htmlFor="experience" className="text-gray-700 font-medium">Experience</label>
        <InputField icon={Briefcase} type="text" name="experience" placeholder="Experience" onChange={handleChange} />
      </div>
  
      {/* Active Checkbox */}
      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="isActive" className="text-gray-700">Active</label>
      </div>
  
      {/* Address - Street */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address.street" className="text-gray-700 font-medium">Street</label>
        <InputField icon={MapPin} type="text" name="address.street" placeholder="Street" onChange={handleChange} />
      </div>
  
      {/* Address - City */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address.city" className="text-gray-700 font-medium">City</label>
        <InputField icon={MapPin} type="text" name="address.city" placeholder="City" onChange={handleChange} />
      </div>
  
      {/* Address - State */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address.state" className="text-gray-700 font-medium">State</label>
        <InputField icon={MapPin} type="text" name="address.state" placeholder="State" onChange={handleChange} />
      </div>
  
      {/* Address - Country */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address.country" className="text-gray-700 font-medium">Country</label>
        <InputField icon={MapPin} type="text" name="address.country" placeholder="Country" onChange={handleChange} />
      </div>
  
      {/* Submit Button */}
      <div className="col-span-full mt-4">
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          <ShieldCheck className="inline w-5 h-5 mr-2" /> Submit Teacher Info
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default AddTeacherForm;
