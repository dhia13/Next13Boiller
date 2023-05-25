import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import RegisterReducer from "./RegisterReducer";
import AppReducer from "./AppReducer";
export default combineReducers({
  UserReducer,
  RegisterReducer,
  AppReducer,
});
