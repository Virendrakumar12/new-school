import { createSlice } from '@reduxjs/toolkit';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  loginTeacher,
} from '@/redux/Actions/TeacherActions';

const initialState = {
  teachers: [],
  teacher: null,
  teacherLogin:null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    clearTeacher: (state) => {
      state.teacher = null;
    },
    setTeacher:(state,action)=>{
        state.teacher=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE TEACHER
      .addCase(createTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage = 'Teacher created successfully';
        state.teachers.push(action.payload.savedTeacher);
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

             // LOGIN TEACHER
      .addCase(loginTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage = 'Teacher login successful';
        state.teacher=action.payload.teacher;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
   // LOGIN TEACHER
   
      




      // GET ALL TEACHERS
      .addCase(getAllTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // GET TEACHER BY ID
      .addCase(getTeacherById.pending, (state) => {
        state.isLoading = true;
        state.teacher = null;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher = action.payload;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // UPDATE TEACHER
      .addCase(updateTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage = 'Teacher updated successfully';
        state.teachers = state.teachers.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // DELETE TEACHER
      .addCase(deleteTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage = 'Teacher deleted successfully';
        state.teachers = state.teachers.filter((t) => t._id !== action.payload.id);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearStatus, clearTeacher,setTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
