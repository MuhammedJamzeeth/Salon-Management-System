import { combineReducers } from "redux";
import { currentPage } from "./current.page.reducer";
import { serviceReducer } from "./service.reducer";
import { staffReducer } from "./staff.reducer";
import { userReducer } from "./user.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  currentPage,
  services: serviceReducer,
  staff: staffReducer,
});
