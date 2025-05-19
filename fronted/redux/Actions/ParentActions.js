import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance'; // adjust path if needed

// Create Parent
export const createParent = createAsyncThunk(
  'parent/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/parent/addParent', formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);
export const loginParent = createAsyncThunk(
  'parent/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/parent/loginParent', formData);
       console.log("parent information",res);
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
// Get All Parents by School
export const getParentsBySchool = createAsyncThunk(
  'parent/getBySchool',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/parent/school');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Get Parent by ID
export const getParentById = createAsyncThunk(
  'parent/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/parent/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Get Parent by Parent Code
export const getParentByCode = createAsyncThunk(
  'parent/getByCode',
  async (code, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/parent/code/${code}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Update Parent
export const updateParent = createAsyncThunk(
  'parent/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/parent/update/${id}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Delete Parent
export const deleteParent = createAsyncThunk(
  'parent/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/parent/delete/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// features/student/studentActions.js
// adjust path if needed

export const fetchStudentsByParentId = createAsyncThunk(
  'student/fetchByParentId',
  async (parentId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/parent/parentStudent/${parentId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);
