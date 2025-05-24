// subjectThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance';

// CREATE Subject
export const createSubject = createAsyncThunk(
  'subject/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/subject/addSubject', formData); // adjust endpoint if needed
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create subject');
    }
  }
);

// GET ALL Subjects
export const getAllSubjects = createAsyncThunk(
  'subject/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/subject/getAllSubject');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

// GET Subject By ID
export const getSubjectById = createAsyncThunk(
  'subject/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/subject/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subject');
    }
  }
);

// UPDATE Subject
export const updateSubject = createAsyncThunk(
  'subject/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/subject/updateSubject/${id}`, updatedData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update subject');
    }
  }
);

// DELETE Subject
export const deleteSubject = createAsyncThunk(
  'subject/delete',
  async (id, { rejectWithValue }) => {
    try {
      
      const res = await axiosInstance.delete(`/subject/deleteSubject/${id}`);
      
      return  res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete subject');
    }
  }
);
