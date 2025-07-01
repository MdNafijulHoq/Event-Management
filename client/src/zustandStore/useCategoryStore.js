import { create } from "zustand";
import axios from "axios";

const CategoryStore = create((set) => ({
  category: null,

  getCategory: async () => {
    try {
      let response = await axios.get(
        "/eventmanagement/api/ViewCategory"
      );
      if (response.data.status === "success") {
        set({ category: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  getByCategory: async (id) => {
    try {
      let response = await axios.get(
        `/eventmanagement/api/ListByCategory/${id}`
      );
      if (response.data.status === "success") {
        set({ category: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default CategoryStore;
