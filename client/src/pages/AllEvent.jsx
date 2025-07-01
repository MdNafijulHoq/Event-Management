import React, { useEffect, useState } from "react";
import EventStore from "../zustandStore/useEventStore";
import RootLayout from "../components/layout/RootLayout";
import EventCart from "../shared/EventCart";

const AllEvent = () => {
  const { Event, getEvent, searchEvents, filterEvents, resetEvents } =
    EventStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchEvents(searchTerm);
    } else {
      resetEvents();
    }
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    if (type) {
      filterEvents(type);
    } else {
      resetEvents();
    }
  };

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Combined Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search events by title..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                resetEvents();
                setFilterType("");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Reset
            </button>
          </form>

          {/* Filter Select Box */}
          <div className="w-full sm:w-64">
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Filter Events</option>
              <option value="today">Today</option>
              <option value="currentWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="currentMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12 place-items-center py-8">
          {Event && Event.length > 0 ? (
            Event.map((item) => (
              <div key={item._id} className="w-full max-w-xs">
                <EventCart event={item} />
              </div>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default AllEvent;
