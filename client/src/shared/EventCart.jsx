import React, { useState } from "react";
import { Link } from "react-router";
import EventStore from "../zustandStore/useEventStore";
import AuthStore from "../zustandStore/useAuthStore";
import toast from "react-hot-toast";

const EventCart = ({ event }) => {
  const { joinEvent } = EventStore();
  const { AuthUser } = AuthStore();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Check if current user is the event creator
  const isEventCreator = AuthUser?._id === event.userId;

  const handleJoinEvent = async () => {
    if (!AuthUser) {
      toast.error("Please login to join events");
      return;
    }
    if (hasJoined || isEventCreator) return;

    setIsJoining(true);
    try {
      const success = await joinEvent(event._id);
      if (success) {
        setHasJoined(true);
      }
    } finally {
      setIsJoining(false);
    }
  };
  return (
    <div
      title={event.title}
      className="w-full max-w-xs bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300 min-h-fit"
    >
      <Link to={`/event-details/${event._id}`}>
        <div className="w-full h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {event.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-auto text-sm text-gray-500">
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.startTime} - {event.endTime}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Attend Count:</strong> {event.attendeeCount || 0}
          </p>
          <div className="flex justify-center mt-3">
            {isEventCreator ? (
              <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg text-sm font-medium">
                Your Event
              </span>
            ) : (
              <button
                onClick={handleJoinEvent}
                disabled={isJoining || hasJoined}
                className={`px-4 py-2 ${
                  hasJoined ? "bg-green-600" : "bg-blue-600"
                } text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ${
                  isJoining || hasJoined ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {hasJoined ? "Joined" : isJoining ? "Joining..." : "Join Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCart;
