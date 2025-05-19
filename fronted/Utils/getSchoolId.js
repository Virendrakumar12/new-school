import { jwtDecode } from 'jwt-decode';

const getSchoolIdFromToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.schoolId || null;  // ✅ safely return schoolId
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }
  return null;
};

export default getSchoolIdFromToken;
