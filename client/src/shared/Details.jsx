import React, { useEffect } from "react";
import RootLayout from "../components/layout/RootLayout";
import { useParams } from "react-router";
import EventStore from "../zustandStore/useEventStore";

const Details = () => {
  const { id } = useParams();
  const { Event, GetEventDetailsByID } = EventStore();
  useEffect(() => {
    (async () => {
      await GetEventDetailsByID(id);
    })();
  }, [id, GetEventDetailsByID]);

  return (
    <RootLayout>
      {Event &&
        Event.map((item) => {
          return (
			<div key={item._id} title={item.title} className="p-5 mx-auto sm:p-10 md:p-16 text-gray-800">
			<div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded shadow-md">
			  <img
				src={item.image}
				alt={item.title}
				className="w-full h-60 sm:h-96 object-cover rounded-t-md"
			  />
			  <div className="p-6 pb-12 -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 bg-white rounded-md shadow-md">
				<div className="space-y-2">
				  <p className="text-2xl sm:text-3xl font-semibold bg-amber-500 text-white p-4 rounded-2xl shadow">
					{item.title}
				  </p>
				  <p><span className="font-semibold underline">Description:</span> {item.description}</p>
				  <p><span className="font-semibold underline">Event Date:</span> {new Date(item.eventDate).toLocaleDateString()}</p>
				  <p><span className="font-semibold underline">Start Time:</span> {item.startTime}</p>
				  <p><span className="font-semibold underline">End Time:</span> {item.endTime}</p>
				</div>
				<div className="space-y-2">
				  <p><span className="font-semibold underline">Organizer:</span> {item.organizer}</p>
				  <p><span className="font-semibold underline">Location:</span> {item.location}</p>
				  {item.category && (
					<div className="flex items-center gap-4 pt-4">
					  <img
						src={item.category.categoryImage}
						alt={item.category.categoryName}
						className="w-12 h-12 object-cover rounded-full border shadow"
					  />
					  <p><span className="font-semibold underline">Category:</span> {item.category.categoryName}</p>
					</div>
				  )}
				</div>
			  </div>
			</div>
		  </div>
		  
          );
        })}
    </RootLayout>
  );
};

export default Details;
