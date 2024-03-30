import { SERVICE_ACTION_TYPES } from "../constants/service.type";

const INITIAL_SERVICES = {
  current_services: [],
};

export const serviceReducer = (state = INITIAL_SERVICES, { type, payload }) => {
  switch (type) {
    case SERVICE_ACTION_TYPES.SET_SERVICE:
      return {
        ...state,
        current_services: payload,
      };
    case SERVICE_ACTION_TYPES.ADD_SERVICE:
      return {
        ...state,
        current_services: [...state.current_services, payload],
      };
    case SERVICE_ACTION_TYPES.DELETE_SERVICE:
      return {
        ...state,
        current_services: [...payload],
      };
    default:
      return state;
  }
};
