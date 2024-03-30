import { APPOINTMENT_ACTION_TYPES } from "../constants/appointment.type";

const INITIAL_SERVICES = {
  current_appointment: [],
};

export const appointmentReducer = (
  state = INITIAL_SERVICES,
  { type, payload }
) => {
  switch (type) {
    case APPOINTMENT_ACTION_TYPES.SET_APPOINTMENT:
      return {
        ...state,
        current_appointment: payload,
      };
    case APPOINTMENT_ACTION_TYPES.ADD_APPOINTMENT:
      return {
        ...state,
        current_appointment: [...state.current_services, payload],
      };
    case APPOINTMENT_ACTION_TYPES.DELETE_APPOINTMENT:
      return {
        ...state,
        current_appointment: [...payload],
      };

    default:
      return state;
  }
};
