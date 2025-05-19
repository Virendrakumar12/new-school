import React, { useEffect, useState } from 'react';
import SectionCard from '@/components/SectionCard';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSection, getSectionsByClassId } from '@/redux/Actions/SectionActions';
import { useRouter } from 'next/router';
import { Plus,X } from 'lucide-react';
import {
  clearSection,
  clearSectionsList,setSection
} from '@/redux/Slices/sectionSlice';



const SectionList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {  sections = [],error, loading } = useSelector((state) => state.section);
  const {selectedClass } = useSelector((state) => state.class);
 
 // const [selectedSection, setSelectedSection] = useState(null);
    const [showModal, setShowModal] = useState(false); // For controlling the modal visibility
     const [actionType, setActionType] = useState(''); // To differentiate between Update and Delete actions
     const [selectedSection, setSelectedSection] = useState(null);
 
 
 useEffect(() => {
  if (!selectedClass || !selectedClass?._id) {
    console.warn("Waiting for selectedClass...");
    return;
  }

  console.log("Dispatching getSectionsByClassId with:", selectedClass?._id);
  dispatch(clearSection());
  dispatch(clearSectionsList());

  dispatch(getSectionsByClassId(selectedClass?._id))
    .unwrap()
    .then((res) => {
     
      if (!res || res.length === 0) {
        dispatch(clearSectionsList());
      }
    })
    .catch((err) => {
      console.error("Error fetching sections:", err);
      dispatch(clearSectionsList());
    });
}, [selectedClass?._id]); // ✅ use the _id directly as a dependency

const handleActionConfirm = () => {
  
   const sectionId=selectedSection._id;
 dispatch(deleteSection(sectionId))

    handleModalClose(); // Close the modal after action
  };
  const handleAddTeacher = (section) => {
    // e.g., open modal to assign teacher
   
    dispatch(setSection(section));
   
    router.push("/Dashboard/Section/AddTeacher");
    
    //router.push("/Dashboard/Section/ClassTeacher")
    
  };
  const handleView = (section) => {
    // Navigate or open modal to show full section + subjects
    dispatch(setSection(section));
  
    router.push("/Dashboard/Section/Info/Detail");
    
    
  };
  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    setSelectedSection(null); // Reset the selected class
  };
  const handleUpdate=(section)=>{
    dispatch(setSection(section));
    
    router.push("/Dashboard/Section/Info/UpdateForm");
  }
  const handleAddSubject = (section) => {
    // e.g., open modal to add subject
    dispatch(setSection(section));
   
    router.push("/Dashboard/Section/AddSubject");
    
  }
  const handleDelete = (sectionId) => {
    // e.g., confirm & delete subject
    setActionType('delete');
    setSelectedSection(sections.find((item) => item._id === sectionId));
    setShowModal(true);
    
  };
  if (!selectedClass || !selectedClass._id) {
    return (
      <div className="p-4 sm:ml-64">
        <p className="text-gray-500">Please select a class to view its sections.</p>
      </div>
    );
  }
 
  
  return (
    
    <div className="p-4 sm:ml-64">
 {loading && <p className="text-gray-600">Loading...</p>}
 {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
        <h1 className="text-2xl font-bold">Total Sections: {sections.length}</h1>
        
      </div>

     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections 
        .filter((section) => section !== null)
        .map((section) => (
          <SectionCard
            key={section?._id}
            section={section}
            onAddTeacher={handleAddTeacher}
            onAddSubject={handleAddSubject}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onView={handleView} //
          />
        ))}
      </div>




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
                <p>Are you sure you want to delete {selectedSection?.sectionName}?</p>
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

export default SectionList;
