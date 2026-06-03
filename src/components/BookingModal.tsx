import { useReducer, useState } from "react";
import {
  bookingReducer,
  initialState,
} from "../reducer/bookingReducer";
import BookingSteps from "./BookingSteps";
import { Event } from "../types";

interface Props {
  event: Event;
}

function BookingModal({ event }: Props) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    initialState
  );

  const [bookingComplete, setBookingComplete] =
    useState(false);

  const selectedTicket = event.ticketTypes.find(
    (ticket) => ticket.name === state.ticketType
  );

  const total =
    (selectedTicket?.price || 0) * state.quantity;

  const handleBooking = async () => {
    const booking = {
      userId: "user1",
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      tickets: [
        {
          type: state.ticketType,
          quantity: state.quantity,
          price: selectedTicket?.price,
        },
      ],
      attendees: [state.attendee],
      totalAmount: total,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
      referenceNumber:
        "BK" +
        Math.floor(Math.random() * 1000000),
    };

    await fetch(
      "http://localhost:3001/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    );

    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="border p-6 rounded mt-6">
        <h2 className="text-2xl font-bold text-green-600">
          Booking Successful!
        </h2>

        <p className="mt-2">
          Your booking has been confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded p-6 mt-6">
      <BookingSteps currentStep={state.step} />

      {state.step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Select Tickets
          </h2>

          <select
            value={state.ticketType}
            onChange={(e) =>
              dispatch({
                type: "SET_TICKET",
                payload: e.target.value,
              })
            }
            className="border p-2 w-full mb-4"
          >
            <option value="">
              Select Ticket
            </option>

            {event.ticketTypes.map((ticket) => (
              <option
                key={ticket.id}
                value={ticket.name}
              >
                {ticket.name} - $
                {ticket.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={state.quantity}
            onChange={(e) =>
              dispatch({
                type: "SET_QUANTITY",
                payload: Number(
                  e.target.value
                ),
              })
            }
            className="border p-2 w-full"
          />

          <p className="mt-4 font-bold">
            Total: ${total}
          </p>

          <button
            onClick={() =>
              dispatch({
                type: "NEXT_STEP",
              })
            }
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {state.step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Attendee Details
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-3"
            onChange={(e) =>
              dispatch({
                type: "SET_ATTENDEE",
                payload: {
                  ...state.attendee,
                  name: e.target.value,
                },
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            onChange={(e) =>
              dispatch({
                type: "SET_ATTENDEE",
                payload: {
                  ...state.attendee,
                  email: e.target.value,
                },
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 w-full mb-4"
            onChange={(e) =>
              dispatch({
                type: "SET_ATTENDEE",
                payload: {
                  ...state.attendee,
                  phone: e.target.value,
                },
              })
            }
          />

          <div className="flex gap-3">
            <button
              onClick={() =>
                dispatch({
                  type: "PREVIOUS_STEP",
                })
              }
              className="border px-4 py-2 rounded"
            >
              Back
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "NEXT_STEP",
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {state.step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Confirmation
          </h2>

          <p>
            Ticket: {state.ticketType}
          </p>

          <p>
            Quantity: {state.quantity}
          </p>

          <p>
            Name: {state.attendee.name}
          </p>

          <p>
            Total: ${total}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() =>
                dispatch({
                  type: "PREVIOUS_STEP",
                })
              }
              className="border px-4 py-2 rounded"
            >
              Back
            </button>

            <button
              onClick={handleBooking}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingModal;