import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses, updateClass, deleteClass } from '@/redux/Actions/ClassActions';
import ClassCard from '@/components/ClassCard'; // Import the Card component
import { X } from 'lucide-react'; // Import the cross icon for closing the modal
import { createSection } from '@/redux/Actions/SectionActions';
import { useSnackbar } from 'notistack';
import { setClass } from '@/redux/Slices/classSlice';
import { useRouter } from 'next/router';

const ViewClasses = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router=useRouter();
  const dispatch = useDispatch();
  const {classes,loading,success} = useSelector((state) => state.class);
 
  const [showModal, setShowModal] = useState(false); // For controlling the modal visibility
  const [actionType, setActionType] = useState(''); // To differentiate between Update and Delete actions
  const [selectedClass, setSelectedClass] = useState(null); // To store the selected class for update/delete


  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [selectedClassForSection, setSelectedClassForSection] = useState(null);
  
  const handleAddSection = (classId) => {
    const classData = classes.find((item) => item._id === classId);
    setSelectedClassForSection(classData);
    setShowAddSectionModal(true);
  };
  
  const handleAddSectionClose = () => {
    setShowAddSectionModal(false);
    setSelectedClassForSection(null);
  };
  



  useEffect(() => {
    dispatch(fetchClasses()); // Fetch classes when the component mounts
  }, [dispatch]);

  const handleUpdate = (classId) => {
    setActionType('update');
    setSelectedClass(classes.find((item) => item._id === classId));
    setShowModal(true); // Open the modal for update
  };

  const handleDelete = (classId) => {
    setActionType('delete');
    setSelectedClass(classes.find((item) => item._id === classId));
    setShowModal(true); // Open the modal for delete
  };
const handleView=(classId)=>{
  const classData = classes.find((item) => item._id === classId);
  console.log(classData);
     dispatch(setClass(classData))
     router.push("/Dashboard/Section/SectionList")
   
};
  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    setSelectedClass(null); // Reset the selected class
  };

  const handleActionConfirm = () => {
    if (actionType === 'update') {
      dispatch(updateClass(selectedClass._id)); // Dispatch the update action
    } else if (actionType === 'delete') {
      dispatch(deleteClass(selectedClass._id)); // Dispatch the delete action
    }
    handleModalClose(); // Close the modal after action
  };

  // Outside the JSX, preferably at the top or within the component
const handleSectionSubmit = (e) => {
  e.preventDefault();
  const sectionName = e.target.sectionName.value;
  

  // Dispatch action here
  // dispatch(addSection(selectedClassForSection._id, sectionName));
  dispatch(createSection({ sectionName, classId: selectedClassForSection._id }));
  enqueueSnackbar("section created successfully!", { variant: "success" });

  handleAddSectionClose(); // Close modal after submission
};


  return (
    <div className="p-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Classes</h2>
      {classes.length === 0 ? (
        <p>No classes found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(classes) &&
            classes.map((Class) => (
              <ClassCard
                key={Class._id}
                classData={Class} // Pass class data to Card
                onView={handleView} 
                onUpdate={handleUpdate} // Pass handleUpdate function to Card
                onDelete={handleDelete} // Pass handleDelete function to Card
                onAdd={handleAddSection} //
                />
            ))}
        </div>
      )}



{showAddSectionModal && (
  <div className="absolute inset-0 z-[999] flex items-center justify-center ml-24 mt-12 mr-12 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md w-96 relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={handleAddSectionClose}
      >
        <X size={24} />
      </button>

      <h2 className="text-lg font-bold mb-4">Add Section to {selectedClassForSection?.className}</h2>

      <form
        onSubmit={handleSectionSubmit}
      >
        <label className="block mb-2 text-sm font-medium text-gray-700">Section Name</label>
        <input
          type="text"
          name="sectionName"
          placeholder='SECTION NAME  (eg.  5A) '
          required
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Section
        </button>
      </form>
    </div>
  </div>
)}



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

            <h2 className="text-lg font-bold mb-4">
              {actionType === 'update' ? 'Update Class' : 'Delete Class'}
            </h2>

            {actionType === 'update' ? (
              <div>
                <p>Class Name: {selectedClass?.className}</p>
                {/* Add a form input here for editing if needed */}
                <button
                  className="bg-green-500 text-white cursor-pointer px-4 py-2 rounded mt-4"
                  onClick={handleActionConfirm}
                >
                  Confirm Update
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to delete {selectedClass?.className}?</p>
                <button
                  className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded mt-4"
                  onClick={handleActionConfirm}
                >
                  Confirm Delete
                </button>
              </div>
            )}

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

export default ViewClasses;
