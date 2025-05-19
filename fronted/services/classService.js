import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const classService = {
  // Get all classes
  getAllClasses: async () => {
    try {
      const response = await axios.get(`${API_URL}/classes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get class by ID
  getClassById: async (classId) => {
    try {
      const response = await axios.get(`${API_URL}/classes/${classId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new class
  createClass: async (classData) => {
    try {
      const response = await axios.post(`${API_URL}/classes`, classData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update class
  updateClass: async (classId, classData) => {
    try {
      const response = await axios.put(`${API_URL}/classes/${classId}`, classData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete class
  deleteClass: async (classId) => {
    try {
      const response = await axios.delete(`${API_URL}/classes/${classId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get sections by class ID
  getSectionsByClassId: async (classId) => {
    try {
      const response = await axios.get(`${API_URL}/classes/${classId}/sections`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create section for class
  createSection: async (classId, sectionData) => {
    try {
      const response = await axios.post(`${API_URL}/classes/${classId}/sections`, sectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update section
  updateSection: async (sectionId, sectionData) => {
    try {
      const response = await axios.put(`${API_URL}/sections/${sectionId}`, sectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete section
  deleteSection: async (sectionId) => {
    try {
      const response = await axios.delete(`${API_URL}/sections/${sectionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};