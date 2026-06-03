import { Link } from "react-router-dom";
import { Event } from "../types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

interface Props {
  event: Event;
}

function EventCard({ event }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {event.title}
        </h2>

        <p className="text-sm text-gray-600 mb-1">
          Category: {event.category}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          Location: {event.location}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          Date: {event.date}
        </p>

        <Link
          to={`/event/${event.id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;