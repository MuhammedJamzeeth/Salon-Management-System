import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "../reducers/root.reducer";

const middleWares = [logger];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);
