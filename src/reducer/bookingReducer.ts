export interface BookingState {
  step: number;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  attendee: {
    name: string;
    email: string;
    phone: string;
  };
}

export type BookingAction =
  | { type: "SET_TICKET"; payload: string }
  | { type: "SET_QUANTITY"; payload: number }
  | {
      type: "SET_ATTENDEE";
      payload: {
        name: string;
        email: string;
        phone: string;
      };
    }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" };

export const initialState: BookingState = {
  step: 1,
  ticketType: "",
  quantity: 1,
  totalAmount: 0,
  attendee: {
    name: "",
    email: "",
    phone: "",
  },
};

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case "SET_TICKET":
      return {
        ...state,
        ticketType: action.payload,
      };

    case "SET_QUANTITY":
      return {
        ...state,
        quantity: action.payload,
      };

    case "SET_ATTENDEE":
      return {
        ...state,
        attendee: action.payload,
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1,
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        step: state.step - 1,
      };

    default:
      return state;
  }
}