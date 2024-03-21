import { combineReducers } from "redux";
import { currentPage } from "./current.page.reducer";
import { serviceReducer } from "./service.reducer";
import { staffReducer } from "./staff.reducer";
import { userReducer } from "./user.reducer";
import { appointmentReducer } from "./appointment.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  currentPage,
  services: serviceReducer,
  staff: staffReducer,
  appointments: appointmentReducer,
});
