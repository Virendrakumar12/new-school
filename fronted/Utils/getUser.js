import { jwtDecode } from 'jwt-decode';

export const useCurrentUser = () => {
  // Select user data from the Redux store for student, teacher, and school roles
  if (typeof window !== 'undefined') {
       const token = localStorage.getItem('token');
       if (!token) return null;
   
       try {
         const decoded = jwtDecode(token); 
        
       console.log("token id",decoded._id);
       console.log(" token decode userType",decoded.role);
         return {userId:decoded._id, userType:decoded.role}
         
       } catch (err) {
         console.error('Invalid token', err);
         return null;
       }
     }
     return null;
    }
