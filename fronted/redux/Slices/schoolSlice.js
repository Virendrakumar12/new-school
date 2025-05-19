import { createSlice } from '@reduxjs/toolkit';
import { loginSchool,getSchoolDashboardCounts } from '@/redux/Actions/School/SchoolActions';

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    schoolInfo: null,
    dashboardCounts: {
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
  },
    loading: false,
    logined:false,
    error: null,
  },
  reducers: {
    logoutSchool: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('schoolInfo');
      }
      state.schoolInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.logined=true;
        state.schoolInfo = action.payload;
      })
      .addCase(loginSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSchoolDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchoolDashboardCounts.fulfilled, (state, action) => {
        state.dashboardCounts = action.payload;
        state.loading = false;
      })
      .addCase(getSchoolDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
