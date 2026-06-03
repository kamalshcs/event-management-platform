import { useEffect, useState } from "react";

interface Booking {
  id: string;
  eventTitle: string;
  eventDate: string;
  totalAmount: number;
  status: string;
  referenceNumber: string;
}

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("All");

  const fetchBookings = () => {
    fetch("http://localhost:3001/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    await fetch(`http://localhost:3001/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "cancelled",
      }),
    });

    fetchBookings();
  };

  const today = new Date();

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "All") return true;

    const eventDate = new Date(booking.eventDate);

    if (filter === "Upcoming") {
      return eventDate >= today;
    }

    if (filter === "Past") {
      return eventDate < today;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="All">All</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Past">Past</option>
      </select>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-10">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded p-4 shadow"
            >
              <h2 className="text-xl font-bold">
                {booking.eventTitle}
              </h2>

              <p>
                Event Date: {booking.eventDate}
              </p>

              <p>
                Total Amount: $
                {booking.totalAmount}
              </p>

              <p>
                Reference:
                {" "}
                {booking.referenceNumber}
              </p>

              <p
                className={`font-semibold ${
                  booking.status === "confirmed"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {booking.status}
              </p>

              {booking.status ===
                "confirmed" && (
                <button
                  onClick={() =>
                    handleCancel(
                      booking.id
                    )
                  }
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;