import { createSlice } from '@reduxjs/toolkit';
import { createClass, fetchClasses, fetchClassById, updateClass, deleteClass  } from '@/redux/Actions/ClassActions';

const classSlice = createSlice({
  name: 'class',
  initialState: {
    loading: false,
    success: false,
    selectedClass:null,
    error: null,
    createdClass: null,
    classes:[],
    
  },
  reducers: {
   
    setClass: (state,action) => {
      state.selectedClass =action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Class
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdClass = action.payload;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

 // Fetch all classes
   .addCase(fetchClasses.pending, (state) => {
   state.loading = true;
   })
  .addCase(fetchClasses.fulfilled, (state, action) => {
  state.loading = false;
  state.classes = action.payload;
  })
   .addCase(fetchClasses.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  })
    
   // Fetch single class
   .addCase(fetchClassById.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchClassById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedClass = action.payload;
  })
  .addCase(fetchClassById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
   
  // Update class
  .addCase(updateClass.fulfilled, (state, action) => {
    const index = state.classes.findIndex(c => c._id === action.payload._id);
    if (index !== -1) {
      state.classes[index] = action.payload;
    }
  })
  .addCase(updateClass.rejected, (state, action) => {
    state.error = action.payload;
  })

  // Delete class
  .addCase(deleteClass.fulfilled, (state, action) => {
    state.classes = state.classes.filter(c => c._id !== action.payload);
  })
  .addCase(deleteClass.rejected, (state, action) => {
    state.error = action.payload;
  });







  },
});

export const {setClass} = classSlice.actions;
export default classSlice.reducer;
