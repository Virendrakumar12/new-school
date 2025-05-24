import { jwtDecode } from 'jwt-decode';

export const useCurrentUser = () => {
  // Select user data from the Redux store for student, teacher, and school roles
  if (typeof window !== 'undefined') {
       const token = localStorage.getItem('token');
       if (!token) return null;
   
       try {
         const decoded = jwtDecode(token); 
        
       
         return {userId:decoded._id, userType:decoded.role}
         
       } catch (err) {
         console.error('Invalid token', err);
         return null;
       }
     }
     return null;
    }
