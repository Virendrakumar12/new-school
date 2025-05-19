import { createSlice } from '@reduxjs/toolkit';
import {
  createSection,
  updateSection,
  deleteSection,
  assignClassTeacher,
  getSectionsByClassId,
  getSections,
  assignSubjectToSection ,
  updateSubjectTeacherInClass,
  removeSubjectFromClass
} from '@/redux/Actions/SectionActions'; // adjust path if needed

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    sections: [],
    loading: false,
    error: null,
    message: null,
    section:null
  },
  reducers: {
    
      clearSectionMessage: (state) => {
        state.error = null;
        state.message = null;
      },
      setSection: (state, action) => {
        state.section = action.payload; // selected section
      },
      clearSection: (state) => {
        state.section = null; // clears selected section
      },
      clearSectionsList: (state) => {
        state.sections = []; // clears section list
      }
    
    
    
  },
  extraReducers: (builder) => {
    builder

      // Create Section
      .addCase(createSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload.section);
        state.message = action.payload.message || 'Section created';
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Section
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
      
        // Update the section inside the sections list
        state.sections = state.sections.map((section) =>
          section._id === action.payload._id ? action.payload : section
        );
      
        // Also update the current selected section if needed
        if (state.section && state.section._id === action.payload._id) {
          state.section = action.payload;
        }
      
        state.message = "Section updated successfully.";
      })
      
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update section.";
      })
      

      // Delete Section
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter(section => section._id !== action.payload.sectionId);
        state.message = action.payload.message || 'Section deleted';
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign Class Teacher
      .addCase(assignClassTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignClassTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.map(section =>
          section._id === action.payload.section._id ? action.payload.section : section
        );
        state.message = action.payload.message || 'Class teacher assigned';
      })
      .addCase(assignClassTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Sections by Class ID
      .addCase(getSectionsByClassId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSectionsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action  payload ",action.payload);
        state.sections = action.payload.filter(item => item !== null)

      })
      .addCase(getSectionsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Sections
      .addCase(getSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections;
      })
      .addCase(getSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign Subject to Class
      .addCase(assignSubjectToSection .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignSubjectToSection .fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Subject assigned';
      })
      .addCase(assignSubjectToSection .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Subject Teacher in Class
      .addCase(updateSubjectTeacherInClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubjectTeacherInClass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Subject teacher updated';
      })
      .addCase(updateSubjectTeacherInClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Subject from Class
      .addCase(removeSubjectFromClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSubjectFromClass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Subject removed';
      })
      .addCase(removeSubjectFromClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSectionMessage,setSection,clearSection,clearSectionsList } = sectionSlice.actions;
export default sectionSlice.reducer;
