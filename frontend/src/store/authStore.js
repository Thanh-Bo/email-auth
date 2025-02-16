import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user : null , 
    isAuthenticated : false,
    isLoading : false, 
    isCheckingAuth : true,
 
    signup : async (email , password , name) => {
        set({isLoading : true})
        try {
            const response = await axios.post(`${API_URL}/signup`,{email , password , name}  );
            set({
                isAuthenticated : true,
                user: response.data.user,
                isLoading : false,
            });
            toast.success("Account created successfully");
            return {success : true};
        }
        catch (error) {
			console.error ("Signup error : ", error.response.data.message );
            toast.error(error.response?.data?.message);
            set({isLoading : false});
			
		}
    },
    login  : async (email , password) => {
        set({isLoading : true});
        try {
            const response = await axios.post(`${API_URL}/login`, {email , password});
            set({
                user : response.data.user,
                isAuthenticated : true , 
                isLoading : false
            })
            toast.success('Logged in successfully');
            return {success : true};
        }
        catch(error){
            console.error('Error login in : ',error.response.data.message);
            toast.error(error.response?.data?.message);
            set({ isLoading : false})
        }
    },
    logout : async () => {
        set({ isLoading : true });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user : null , isAuthenticated : false ,  isLoading : false});
            toast.success("Logged out successfully");
            return ({success : true})
        }
        catch(error){
            console.error("Error in loggin out : ", error.response.data.message); 
            toast.error(error.response.data.message);
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true });
    
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
    
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            toast.success("Email verified successfully");
    
            return { success: true, user: response.data.user }; // ✅ Return success response
        } catch (error) {
            console.error("Error verifying email:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Error verifying email");
    
            set({ isLoading: false });
            return { success: false, error: error.response?.data?.message || "Error verifying email" }; // ✅ Return failure response
        }
    },
    
    checkAuth: async () => {
        set({ isCheckingAuth: true });
    
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
    
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            return { success: true, user: response.data.user }; // ✅ Return success response
        } catch (error) {
            console.error("Error in checkAuth:", error.response?.data?.message || error.message);
            
            set({ isCheckingAuth: false, isAuthenticated: false });
            return { success: false, error: error.response?.data?.message || "Authentication check failed" }; // ✅ Return failure response
        }
    },
    
    forgotPassword: async (email) => {
        set({ isLoading: true });
    
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
    
            set({ message: response.data.message, isLoading: false });
            toast.success(response.data.message);
    
            return { success: true, message: response.data.message }; // ✅ Return success response
        } catch (error) {
            console.error("Error in forgotPassword:", error.response?.data?.message || error.message);
            
            set({ isLoading: false });
            toast.error(error.response?.data?.message || "Error sending reset password email");
    
            return { success: false, error: error.response?.data?.message || "Error sending reset password email" }; // ✅ Return failure response
        }
    },
    
    resetPassword: async (token, password) => {
        set({ isLoading: true });
    
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
    
            set({ message: response.data.message, isLoading: false });
            toast.success(response.data.message);
    
            return { success: true, message: response.data.message }; // ✅ Return success response
        } catch (error) {
            console.error("Error in resetPassword:", error.response?.data?.message || error.message);
            
            set({ isLoading: false });
            toast.error(error.response?.data?.message || "Error resetting password");
    
            return { success: false, error: error.response?.data?.message || "Error resetting password" }; // ✅ Return failure response
        }
    },
    
}))