import React, { useEffect, useState } from "react";
import RootLayout from "../layout/RootLayout";
import CategoryStore from "../../zustandStore/useCategoryStore";
import EventStore from "../../zustandStore/useEventStore";
import AuthStore from "../../zustandStore/useAuthStore";
import { useNavigate } from "react-router";

const CreateEvent = () => {
  const { category, getCategory } = CategoryStore();
  const { AuthUser } = AuthStore();
  const { createEvent } = EventStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getCategory();
    })();
  }, [getCategory]);

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

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const success = await createEvent({ ...formData, userId: AuthUser._id });
    if (success) {
      setFormData({
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
    }
    navigate("/event-by-user");
  };

  return (
    <>
      <RootLayout>
        <form
          onSubmit={formSubmit}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>

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
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              placeholder="title...."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows="4"
              required
              placeholder="description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              id="image"
              required
              placeholder="image link...."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

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
              onChange={(e) => handleInputChange("organizer", e.target.value)}
              placeholder="Organizer..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Date
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleInputChange("eventDate", e.target.value)}
                id="eventDate"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

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
                  value={formData.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  id="startTime"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
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
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  id="endTime"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              id="location"
              required
              placeholder="location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

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
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-white"
            >
              <option value="">Select Category</option>
              {category &&
                category?.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.categoryName}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </RootLayout>
    </>
  );
};

export default CreateEvent;
