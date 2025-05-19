import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance';

// ✅ CREATE Teacher
export const createTeacher = createAsyncThunk(
  'teacher/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/teacher/addTeacher', formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);




export const loginTeacher = createAsyncThunk(
  'teacher/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/teacher/loginTeacher', formData);

      // ✅ Store token and teacher info in localStorage (if in browser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
        
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);


// ✅ GET All Teachers
export const getAllTeachers = createAsyncThunk(
  'teacher/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/teacher/getAllTeacher');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch teachers');
    }
  }
);

// ✅ GET Single Teacher by ID
export const getTeacherById = createAsyncThunk(
  'teacher/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/teacher/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Teacher not found');
    }
  }
);

// ✅ UPDATE Teacher
export const updateTeacher = createAsyncThunk(
  'teacher/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/teacher/updateTeacher/${id}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

// ✅ DELETE Teacher
export const deleteTeacher = createAsyncThunk(
  'teacher/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
   const res= await axiosInstance.delete(`/teacher/deleteTeacher/${id}`);
    
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);
