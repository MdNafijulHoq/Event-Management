import React, { useEffect, useState } from "react";
import CategoryStore from "../../zustandStore/useCategoryStore";
import EventStore from "../../zustandStore/useEventStore";
import { X } from "lucide-react";

const UpdateEvent = ({ eventId, setShowModal }) => {
  const { category, getCategory } = CategoryStore();
  const { updateEvent, GetEventDetailsByID, getEventByUser } = EventStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    organizer: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getCategory();
        const eventData = await GetEventDetailsByID(eventId);
        console.log("Event data", eventData);

        if (eventData) {
          setFormData({
            title: eventData.title,
            description: eventData.description,
            image: eventData.image,
            organizer: eventData.organizer,
            eventDate: eventData.eventDate.split("T")[0],
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            location: eventData.location,
            categoryId: eventData.categoryId,
          });
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, getCategory, GetEventDetailsByID]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isUpdated = await updateEvent(eventId, formData);
      if (isUpdated) {
        await getEventByUser();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p>Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Event -{" "}
            <span className="font-medium text-[20px] text-gray-500">
              {formData.title}
            </span>
          </h2>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Organizer */}
          <div>
            <label
              htmlFor="organizer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organizer
            </label>
            <input
              type="text"
              id="organizer"
              required
              value={formData.organizer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Date */}
            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="">Select Category</option>
                {category?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Update Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
