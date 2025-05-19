import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Plus } from 'lucide-react';
import {createSubject,getAllSubjects,updateSubject,deleteSubject}from "@/redux/Actions/SubjectActions"
import SubjectCard from '@/components/SubjectCard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const SubjectList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router=useRouter();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subjects);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ subjectName: '', subjectCode: '' });

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [createSubject,updateSubject,deleteSubject]);

  const handleUpdate = (subject) => {
    
    setActionType('update');
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleDelete = (subject) => {
    setActionType('delete');
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSubject(null);
  };

  const handleActionConfirm = () => {
    console.log(selectedSubject._id)
    if (actionType === 'update') {
      dispatch(updateSubject({ id:selectedSubject._id,  updatedData :selectedSubject}));
      enqueueSnackbar('Subject updated successfully!', { variant: 'success' });
    } else if (actionType === 'delete') {
      const id=selectedSubject._id;
      dispatch(deleteSubject(id))
      .unwrap()
  .then(() => {
    enqueueSnackbar('Subject deleted successfully!', { variant: 'success' });
  })
  .catch(() => {
    enqueueSnackbar('Failed to delete subject.', { variant: 'error' });
  });
    }
    handleModalClose();
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    dispatch(createSubject(newSubject));
    enqueueSnackbar('Subject added successfully!', { variant: 'success' });
    setShowAddModal(false);
    
    setNewSubject({ subjectName: '', subjectCode: '' });
  };

  return (
    <div className="p-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Subjects</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={20} /> Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowAddModal(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4">Add New Subject</h2>
            <form onSubmit={handleAddSubject}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newSubject.subjectName}
                onChange={(e) => setNewSubject({ ...newSubject,subjectName: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">subjectCode</label>
              <input
                type="text"
                value={newSubject.subjectCode}
                onChange={(e) => setNewSubject({ ...newSubject,subjectCode: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Create Subject
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update/Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={handleModalClose}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {actionType === 'update' ? 'Update Subject' : 'Delete Subject'}
            </h2>
            {actionType === 'update' ? (
              <>
                <input
                  type="text"
                  value={selectedSubject?.subjectName|| ''}
                  onChange={(e) =>
                    setSelectedSubject((prev) => ({ ...prev,subjectName: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2 mb-4"
                />
                <textarea
                  value={selectedSubject?.subjectCode|| ''}
                  onChange={(e) =>
                    setSelectedSubject((prev) => ({ ...prev, subjectCode: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2 mb-4"
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleActionConfirm}
                >
                  Confirm Update
                </button>
              </>
            ) : (
              <>
                <p>Are you sure you want to delete <strong>{selectedSubject?.subjectName}</strong>?</p>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                  onClick={handleActionConfirm}
                >
                  Confirm Delete
                </button>
              </>
            )}
            <button
              className="mt-4 ml-2 text-gray-600"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;
