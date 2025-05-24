import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeacher,getAllTeachers ,updateTeacher,getTeacherById,deleteTeacher }from '@/redux/Actions/TeacherActions';
import TeacherCard from '@/components/TeacherCard';
import { setTeacher } from '@/redux/Slices/TeacherSlice';
import { X } from 'lucide-react';
const TeacherListPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showAddSalaryModal, setShowAddSalaryModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [salary, setSalary] = useState("");

  const { teachers, isLoading, isSuccess,isError, errorMessage,successMessage } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  const handleAddSalaryClose = () => {
    setShowAddSalaryModal(false);
    setSalary("");
  };

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    console.log(selectedTeacherId._id);
    console.log(salary);
    handleAddSalaryClose();
   try{
    dispatch(updateTeacher({
        id: selectedTeacherId._id,
        formData: { salary:salary }
      }));
      
    setShowAddSalaryModal(false);
    setSalary("");
   }
   catch(error){
    console.log(error);
   }
   
  };




  const handleDelete = async (id) => {
    try {
     
     
      dispatch(deleteTeacher(id))
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (teacher) => {
    try{
        dispatch(setTeacher(teacher));
        router.push("/Dashboard/Teacher/UpdateTeacher")
        }
        catch(error){
            console.log(error)
        }

  };

  const handleView = (teacher) => {
    try{
        dispatch(setTeacher(teacher));
        router.push("/Dashboard/Teacher/ViewTeacher")
        }
        catch(error){
            console.log(error)
        }
  
  };

  const handleSalary = (teacherId) => {
    const teacherData = teachers.find((item) => item._id ===teacherId);
    setSelectedTeacherId(teacherData);
    
    setShowAddSalaryModal(true);
    
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
        <h1 className="text-2xl font-bold">Total Teachers: {teachers.length}</h1>
        <button
          onClick={() => router.push('/Dashboard/Teacher/AddTeacher')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {isLoading && <p className="text-gray-600">Loading...</p>}
      {isError && <p className="text-red-500">{isError}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher._id}
            teacher={teacher}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            onSalary={handleSalary}
          />
        ))}
      </div>

      {showAddSalaryModal && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
          <h2 className="text-lg font-bold mb-4">A month salary of {selectedTeacherId.firstName}  </h2>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={handleAddSalaryClose}
            >
              <X size={24} />
            </button>

         

            <form
              onSubmit={handleSalarySubmit}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Salary Amount</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter Salary"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Add Salary
              </button>
            </form>
          </div>
        </div>
      )}




    </div>
  );
};

export default TeacherListPage;
