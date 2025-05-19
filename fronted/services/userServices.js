// User management service for admin operations

const API_URL = 'http://localhost:5000/api';

// Mock data for development
const mockUsers = {
  teachers: [
    { id: 1, name: 'John Doe', subject: 'Mathematics', email: 'john@school.com' },
    { id: 2, name: 'Jane Smith', subject: 'Science', email: 'jane@school.com' }
  ],
  students: [
    { id: 1, name: 'Alice Brown', grade: '10th', email: 'alice@school.com' },
    { id: 2, name: 'Bob Wilson', grade: '9th', email: 'bob@school.com' }
  ],
  parents: [
    { id: 1, name: 'Mike Brown', student: 'Alice Brown', email: 'mike@example.com' },
    { id: 2, name: 'Sarah Wilson', student: 'Bob Wilson', email: 'sarah@example.com' }
  ]
};

// Get all users of a specific type (teachers, students, or parents)
export const getUsers = async (userType) => {
  try {
    // Simulate network delay and potential failures
    const shouldFail = Math.random() < 0.2; // 20% chance of failure
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    if (shouldFail) {
      throw new Error('Service temporarily unavailable');
    }

    // In production, this would be an API call
    // const response = await fetch(`${API_URL}/${userType}`);
    // return response.json();
    
    // For development, return mock data
    return Promise.resolve(mockUsers[userType] || []);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.')
  }
};

// Add a new user
export const addUser = async (userType, userData) => {
  try {
    // In production, this would be an API call
    // const response = await fetch(`${API_URL}/${userType}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // });
    // return response.json();
    
    // For development, simulate adding to mock data
    const newUser = {
      id: mockUsers[userType].length + 1,
      ...userData
    };
    mockUsers[userType].push(newUser);
    return Promise.resolve(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userType, userId) => {
  try {
    // In production, this would be an API call
    // await fetch(`${API_URL}/${userType}/${userId}`, {
    //   method: 'DELETE',
    // });
    
    // For development, simulate deletion from mock data
    const index = mockUsers[userType].findIndex(user => user.id === userId);
    if (index !== -1) {
      mockUsers[userType].splice(index, 1);
    }
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (userType, userId, userData) => {
  try {
    // In production, this would be an API call
    // const response = await fetch(`${API_URL}/${userType}/${userId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // });
    // return response.json();
    
    // For development, simulate updating mock data
    const index = mockUsers[userType].findIndex(user => user.id === userId);
    if (index !== -1) {
      mockUsers[userType][index] = { ...mockUsers[userType][index], ...userData };
      return Promise.resolve(mockUsers[userType][index]);
    }
    throw new Error('User not found');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};