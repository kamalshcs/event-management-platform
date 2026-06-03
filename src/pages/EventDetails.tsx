import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../types";
import Loader from "../components/Loader";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;

  if (!event) {
    return (
      <div className="p-6">
        Event not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6">
        {event.title}
      </h1>

      <p className="mt-4 text-gray-600">
        {event.description}
      </p>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Date:</strong> {event.date}
        </p>

        <p>
          <strong>Time:</strong> {event.time}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Venue:</strong> {event.venue}
        </p>

        <p>
          <strong>Organizer:</strong>{" "}
          {event.organizerName}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Ticket Types
        </h2>

        <div className="space-y-3">
          {event.ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-4 rounded"
            >
              <p className="font-semibold">
                {ticket.name}
              </p>

              <p>${ticket.price}</p>

              <p>
                Available: {ticket.available}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded">
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default EventDetails;