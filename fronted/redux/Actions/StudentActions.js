import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance'; // Update path based on your project

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/student/addStudent', studentData); // your route: POST /students
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to create student');
    }
  }
);

 // Adjust to your path

// Async thunk for student login
export const loginStudent = createAsyncThunk(
  'student/login',
  async (formData, { rejectWithValue }) => {
    try {
      console.log("i am at student login",formData)
      const res = await axiosInstance.post('/student/loginStudent', formData);

      // ✅ Store token in localStorage
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


export const getAllStudents = createAsyncThunk(
    'student/getAllStudents',
    async (_, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.get('/student/getAllStudent'); // your route: GET /students
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch students');
      }
    }
  );
  export const getStudentById = createAsyncThunk(
    'student/getStudentById',
    async (studentId, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.get(`/students/${studentId}`); // your route: GET /students/:studentId
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch student');
      }
    }
  );
  
  export const updateStudent = createAsyncThunk(
    'student/updateStudent',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        console.log("i am at updated student",updatedData)
        const res = await axiosInstance.put(`/student/updatedStudent/${id}`, updatedData); // your route: PUT /students/:studentId
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to update student');
      }
    }
  );
  export const deleteStudent = createAsyncThunk(
    'student/deleteStudent',
    async (studentId, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.delete(`/student/deleteStudent/${studentId}`); // your route: DELETE /students/:studentId
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete student');
      }
    }
  );
    
      // student fee management
      // features/monthlyFee/generateFees.js
 // Make sure the path is correct

export const generateMonthlyFees = createAsyncThunk(
  'monthlyFee/generateMonthlyFees',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/fees/generateFees', data); // API endpoint for generating fees
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to generate monthly fees');
    }
  }
);

export const fetchMonthlyFees = createAsyncThunk(
  'monthlyFee/fetchMonthlyFees',
  async (studentId, { rejectWithValue }) => {
    try {
      console.log("fetch student  in table id",studentId);
      const res = await axiosInstance.get(`/fees/student/${studentId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error fetching fees');
    }
  }
);
// src/redux/monthPayment/monthPaymentActions.js


export const deleteMonthlyPaymentsByStudent = createAsyncThunk(
  'monthPayment/deleteMonthlyPaymentsByStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/fees/deleteMonthlyFee/${studentId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete monthly payments');
    }
  }
);
