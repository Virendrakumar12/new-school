import { createSlice } from '@reduxjs/toolkit';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  loginStudent,
  generateMonthlyFees,
  fetchMonthlyFees,
  deleteMonthlyPaymentsByStudent
} from '@/redux/Actions/StudentActions';

const initialState = {
  students: [],
  studentDetails: null,
  studentLogin:null,
  loading: false,
  error: null,
  fees: [],
  success: false,
   deletedCount: 0,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearStudentState: (state) => {
      state.studentDetails = null;
      state.success = false;
      state.error = null;
    },
    setStudent:(state,action)=>{
      state.studentDetails=action.payload;
    },
    logoutStudent: (state) => {
      state.studentDetails = null;
      
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    // Create Student
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        state.success = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails= action.payload.student;
      
        state.error = null;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Student by ID
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.students = state.students.map(student =>
          student.registrationNumber === action.payload.registrationNumber
            ? action.payload
            : student
        );
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.students = state.students.filter(
          (student) => student.registrationNumber !== action.meta.arg
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(generateMonthlyFees.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(generateMonthlyFees.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(generateMonthlyFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
      })
      .addCase(fetchMonthlyFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(deleteMonthlyPaymentsByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = '';
      })
      .addCase(deleteMonthlyPaymentsByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.deletedCount = action.payload.deletedCount;
      })
      .addCase(deleteMonthlyPaymentsByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearStudentState,setStudent } = studentSlice.actions;
export default studentSlice.reducer;
