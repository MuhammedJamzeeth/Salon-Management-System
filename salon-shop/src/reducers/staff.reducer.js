import { STAFF_ACTION_TYPES } from "../constants/staff.type";

const INITIAL_STAFF = {
  current_staff: [],
};

export const staffReducer = (state = INITIAL_STAFF, { type, payload }) => {
  switch (type) {
    case STAFF_ACTION_TYPES.SET_STAFF:
      return {
        ...state,
        current_staff: payload,
      };
    case STAFF_ACTION_TYPES.ADD_STAFF:
      return {
        ...state,
        current_staff: [...state.current_staff, payload],
      };
    case STAFF_ACTION_TYPES.DELETE_STAFF:
      return {
        ...state,
        current_staff: [...payload],
      };
    default:
      return state;
  }
};
