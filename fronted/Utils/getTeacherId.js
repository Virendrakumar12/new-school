import { jwtDecode } from 'jwt-decode';


const getTeacherId = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) return null;
  
      try {
        const decoded = jwtDecode(token); // ✅ updated function name
        return decoded._id;
      } catch (err) {
        console.error('Invalid token', err);
        return null;
      }
    }
    return null;
  };
  
  export default getTeacherId;
  