import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const AuthStore = create((set) => ({
  AuthUser: null,
  isLoading: false,
  isAuthChecking: false,

  checkCurreentUser: async () => {
    set({ isAuthChecking: true });
    try {
      let response = await axios.get(
        "/eventmanagement/api/CheckingLoggedInUser"
      );
      if (response.data.status === "success") {
        set({ AuthUser: response.data.data });
      } else {
        set({ AuthUser: null });
      }
    } catch (error) {
      console.error(error.message);
      set({ AuthUser: null });
    } finally {
      set({ isAuthChecking: false });
    }
  },

  getAuthSignUp: async (data) => {
    set({ isLoading: true });
    try {
      let response = await axios.post("/eventmanagement/api/UserSignUp", data);
      if (response.data.status === "success") {
        toast.success("User created successfully");
        set({ AuthUser: response.data.data });
        await AuthStore.getState().checkCurreentUser();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getAuthSignIn: async (data) => {
    set({ isLoading: true });
    try {
      let response = await axios.post("/eventmanagement/api/UserSignIn", data);
      if (response.data.status === "success") {
        toast.success("User Login successful");
        set({ AuthUser: response.data.data });
        await AuthStore.getState().checkCurreentUser();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  LogOutUser: async () => {
    try {
      let response = await axios.get("/eventmanagement/api/UserLogOut");
      if (response.data.status === "success") {
        set({ AuthUser: null });
        toast.success("Logout User");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default AuthStore;
