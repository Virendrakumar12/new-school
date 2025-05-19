// subjectSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} from '@/redux/Actions/SubjectActions';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subjects: [],
    subject:null,
    subject: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSubjectMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setSubject:(state,action)=>{
            state.subject=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);
        state.successMessage = 'Subject created successfully';
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getSubjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(getSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.map((subj) =>
          subj._id === action.payload._id ? action.payload : subj
        );
        state.successMessage = 'Subject updated successfully';
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter((s) => s._id !== action.payload.id);
        state.successMessage = action.payload.message;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubjectMessages,setSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
