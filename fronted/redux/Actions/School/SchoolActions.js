import axiosInstance from '@/Utils/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const loginSchool = createAsyncThunk(
  'school',
  async (formData, { rejectWithValue }) => {
    try {
     
       // ✅ correct
      
      const res  = await axiosInstance.post("/school/login", formData);
 
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
      //  localStorage.setItem('schoolInfo', JSON.stringify(res.data.school));
      }

      return res.data; // returned as action.payload automatically
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }

); 
// src/redux/actions/schoolActions.js or directly in the slice file
 // adjust your path

export const getSchoolDashboardCounts = createAsyncThunk(
  'school/getDashboardCounts',
  async (_, { rejectWithValue }) => {
    try {
      
      const res = await axiosInstance.get('/school/getTotal');
     
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load dashboard data'
      );
    }
  }
);
