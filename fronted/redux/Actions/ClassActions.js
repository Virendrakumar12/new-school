import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance'; // your axios setup

export const createClass = createAsyncThunk(
  'class/create',
  async (formData, { rejectWithValue }) => {
    try {
     
      const res = await axiosInstance.post('/class/addClass',formData) 
       
    
      return res.data;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const fetchClasses = createAsyncThunk(
  'class/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/class/getAllClass'); // adjust endpoint if needed
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);

export const fetchClassById = createAsyncThunk(
  'class/fetchById',
  async (classId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/class/${classId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);

export const updateClass = createAsyncThunk(
  'class/update',
  async ({ classId, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/class/${classId}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);



export const deleteClass = createAsyncThunk(
  'class/delete',
  async (classId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/class/${classId}`);
      return classId; // return ID to remove from local state
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);
