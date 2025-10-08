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
        current_appointment: [...state.current_appointment, payload],
      };
    case APPOINTMENT_ACTION_TYPES.DELETE_APPOINTMENT:
      return {
        ...state,
        current_appointment: state.current_appointment.filter(
          (appointment) => appointment.id !== payload.id
        ),
      };
    case APPOINTMENT_ACTION_TYPES.UPDATE_APPOINTMENT:
      const updatedIndex = state.current_appointment.findIndex(
        (appointment) => appointment.id === payload.id
      );
      if (updatedIndex === -1) {
        return state; // If appointment not found, return the current state
      }
      const updatedAppointments = [...state.current_appointment];
      updatedAppointments[updatedIndex] = payload;
      return {
        ...state,
        current_appointment: updatedAppointments,
      };

    default:
      return state;
  }
};
