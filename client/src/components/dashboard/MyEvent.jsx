import React, {  useEffect, useState } from "react";
import RootLayout from "../layout/RootLayout";
import EventStore from "../../zustandStore/useEventStore";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import UpdateEvent from "./UpdateEvent";

const MyEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { Event, getEventByUser, DeleteEvent } = EventStore();
  console.log("Select event id", selectedEventId);
  

  useEffect(() => {
    (async () => {
      await getEventByUser();
    })();
  }, [getEventByUser]);

  
  const handleDelete = async (id) => {
    const isDeleted = await DeleteEvent(id);
    if (isDeleted) {
      await getEventByUser();
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedEventId(id);
    setShowModal(true);
  };

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Event && Event.length > 0 ? (
            Event.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Event card content */}
                <div className="p-4">
                  <div className="flex justify-between items-start p-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateClick(item._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {/* Other event details */}
                  <div className="w-full h-48 overflow-hidden">
                    <Link to={`/event-details/${item._id}`}>
                      <div title="click here for details">
                        <img
                          src={item?.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-auto text-sm text-gray-500">
                      <p>
                        <strong>Organizer:</strong>
                        {item.organizer}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(item.eventDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {item.startTime} - {item.endTime}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>
                      <p>
                        <strong>Attend Count:</strong> {item.attendeeCount || 0}
                      </p>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center py-8">No events found</p>
          )}
        </div>

        {/* Update Event Modal */}
        {showModal && (
          <UpdateEvent
            eventId={selectedEventId}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default MyEvent;