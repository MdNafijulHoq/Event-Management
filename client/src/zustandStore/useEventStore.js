import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EventStore = create((set) => ({
  Event: null,

  getEvent: async () => {
    try {
      let response = await axios.get("/eventmanagement/api/GetEvent");
      if (response.data.status === "success") {
        set({ Event: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  createEvent: async (formData) => {
    try {
      let response = await axios.post(
        "/eventmanagement/api/CreateEvent",
        formData
      );
      if (response.data.status === "success") {
        set({ Event: response.data.data });
        toast.success("Event Created");
        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },

  getEventByUser: async () => {
    try {
      let response = await axios.get("/eventmanagement/api/EventByUser");
      if (response.data.status === "success") {
        set({ Event: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  GetEventDetailsByID: async (id) => {
    try {
      let response = await axios.get(
        `/eventmanagement/api/GetEventDetailsByID/${id}`
      );
      if (response.data.status === "success") {
        return response.data.data[0];
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  updateEvent: async (id, formData) => {
    try {
      let response = await axios.put(
        `/eventmanagement/api/UpdateEvent/${id}`,
        formData
      );
      console.log("Update Event Data", response);

      if (response.data.status === "success") {
        set({ Event: response.data.data });
        toast.success("Event Updated");
        return true;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Failed to update event");
      return false;
    }
  },

  DeleteEvent: async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        let response = await axios.delete(
          `/eventmanagement/api/EventDelete/${id}`
        );
        if (response.data.data?.deletedCount > 0) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },

  joinEvent: async (eventId) => {
    try {
      let response = await axios.post(
        `/eventmanagement/api/JoinEvent/${eventId}`
      );
      if (response.data.status === "success") {
        set((state) => ({
          Event:
            state.Event?.map((event) =>
              event._id === eventId
                ? {
                    ...event,
                    attendeeCount: event.attendeeCount + 1,
                  }
                : event
            ) || [],
        }));
        toast.success("Successfully joined event");
        return true;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Failed to join event");
      return false;
    }
  },
  
  searchEvents: async (searchTerm) => {
    try {
      let response = await axios.get(`/eventmanagement/api/search?searchTerm=${searchTerm}`);
      if (response.data.status === "success") {
        set({ Event: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  filterEvents: async (filterType, startDate, endDate) => {
    try {
      let params = { filterType };
      if (filterType === 'customRange') {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      
      let response = await axios.get('/eventmanagement/api/filter', { params });
      if (response.data.status === "success") {
        set({ Event: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  resetEvents: async () => {
    try {
      let response = await axios.get('/eventmanagement/api/GetEvent');
      if (response.data.status === "success") {
        set({ Event: response.data.data });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}));

export default EventStore;
