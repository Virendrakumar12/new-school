



import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance';

export const createSection = createAsyncThunk(
  'section/create',
  async ({ sectionName, classId }, { rejectWithValue }) => {
    try {
        console.log(sectionName,classId)
      const res = await axiosInstance.post('/section/addSection', { sectionName, classId });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);
// redux/Actions/SectionActions.js

 // Replace with your axios config path

export const updateSection = createAsyncThunk(
  'section/update',
  async ({ id, classTeacher, subjects }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/section/updateSection/${id}`, {
        classTeacher,
        subjects,
      });
      console.log("i am action of section controller",res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update section');
    }
  }
);

  export const deleteSection = createAsyncThunk(
    'section/delete',
    async (sectionId, { rejectWithValue }) => {
      try {
        console.log("section id",sectionId)
        const res = await axiosInstance.delete(`/section/deleteSection/${sectionId}`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete section');
      }
    }
  );
  export const assignClassTeacher = createAsyncThunk(
    'section/assignTeacher',
    async ({ sectionId, classTeacher }, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.patch(`/section/assignTeacher/${sectionId}`, { classTeacher });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign teacher');
      }
    }
  );


  
  export const getSectionsByClassId = createAsyncThunk(
    'section/getByClassId',
    async (classId, { rejectWithValue }) => {
      try {
        console.log("i am get by classId",classId);
        const response = await axiosInstance.get(`/section/getAllSectionById/${classId}`);
        console.log("in action part of get section by classid ",response);
        console.log("res.data",response.data);
        const cleanedData = response.data.filter(item => item !== null && typeof item === 'object');
        return cleanedData;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error.message || 'Something went wrong');
      }
    }
  );
  

  export const getSections = createAsyncThunk(
    'section/getAll',
    async (classId = null, { rejectWithValue }) => {
      try {
        const query = classId ? `?classId=${classId}` : '';
        const res = await axiosInstance.get(`/section${query}`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch sections');
      }
    }
  );
  export const assignSubjectToSection = createAsyncThunk(
    'section/assignSubject',
    async ({ sectionId, subjectId, teacherId }, { rejectWithValue }) => {
      try {
              console.log(" iam at assign subject",sectionId,subjectId,teacherId);
        const res = await axiosInstance.post(`/section/add/assignSubject/${sectionId}`, {
          subjectId,
          teacherId,
        });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign subject');
      }
    }
  );
  
  export const updateSubjectTeacherInClass = createAsyncThunk(
    'class/updateSubjectTeacher',
    async ({ classId, subjectId, newTeacherId }, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.put(`/class/update-subject-teacher/${classId}`, {
          subjectId,
          newTeacherId,
        });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update subject teacher');
      }
    }
  );

  export const removeSubjectFromClass = createAsyncThunk(
    'class/removeSubject',
    async ({ classId, subjectId }, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.put(`/class/remove-subject/${classId}`, { subjectId });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to remove subject');
      }
    }
  );
  
  // redux/Actions/SectionActions.js


