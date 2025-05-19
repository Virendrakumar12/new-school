import { createSlice } from '@reduxjs/toolkit';
import {
  createParent,
  getParentsBySchool,
  getParentById,
  getParentByCode,
  updateParent,
  deleteParent,
  loginParent,
  fetchStudentsByParentId
} from '@/redux/Actions/ParentActions';

const initialState = {
  parents: [],
   parentStudents: [],
  parent: null,
  loading: false,
  error: null,
  message: null,
};

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    clearParentState: (state) => {
      state.error = null;
      state.message = null;
    },
     logoutParent: (state) => {
      state.parent = null;
     
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Create Parent
    builder
      .addCase(createParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParent.fulfilled, (state, action) => {
        state.loading = false;
        state.parents.push(action.payload);
        state.message = 'Parent created successfully';
      })
      .addCase(createParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Parents by School
    builder
      .addCase(getParentsBySchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentsBySchool.fulfilled, (state, action) => {
        state.loading = false;
        state.parents = action.payload;
      })
      .addCase(getParentsBySchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginParent.fulfilled, (state, action) => {
        state.loading = false;
        state.parent = action.payload.parent;
        
        state.error = null;
      })
      .addCase(loginParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // Get Parent by ID

      .addCase(getParentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentById.fulfilled, (state, action) => {
        state.loading = false;
        state.parent = action.payload;
      })
      .addCase(getParentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // Get Parent by Code
    
      .addCase(getParentByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.parent = action.payload;
      })
      .addCase(getParentByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Update Parent
      .addCase(updateParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Parent updated successfully';
        state.parent = action.payload;
        // Optionally update parent in parents array
      })
      .addCase(updateParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Delete Paren
      .addCase(deleteParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Parent deleted successfully';
        state.parents = state.parents.filter((p) => p._id !== action.payload._id);
      })
      .addCase(deleteParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
         .addCase(fetchStudentsByParentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByParentId.fulfilled, (state, action) => {
        state.loading = false;
        state.parentStudents = action.payload;
      })
      .addCase(fetchStudentsByParentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearParentState,logoutParent} = parentSlice.actions;
export default parentSlice.reducer;
