import { Link } from "react-router-dom";
import { Event } from "../types";

interface Props {
  event: Event;
}

function EventCard({ event }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {event.title}
        </h2>

        <p>{event.category}</p>

        <p>{event.location}</p>

        <p>{event.date}</p>

        <Link
          to={`/event/${event.id}`}
          className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;