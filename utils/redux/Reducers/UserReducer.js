import { LOGIN, LOGOUT, UPDATEDATA } from "../Types";
// const LocalStorage = JSON.parse(window.localStorage.getItem("UserInfo"));
// const Token = JSON.parse(window.localStorage.getItem("token"));
const initialState = {
  Parameters: {
    Logged: false,
  },
  UserData: {
    id: "",
    username: "",
    photo: "",
    name: "",
    accountType: "",
  },
  Token: "",
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state.LocalStorage,
        UserData: action.payload,
        Parameters: { Logged: true },
      };
    case UPDATEDATA:
      return {
        ...state,
        UserData: {
          ...state.UserData,
          photo: action.payload.photo,
          name: action.payload.name,
          accountType: action.payload.accountType,
          username: action.payload.username,
        },
        Parameters: { Logged: true },
      };
    case LOGOUT:
      return {
        ...state.LocalStorage,
        UserData: "",
        Parameters: { Logged: false },
      };
    default:
      return state;
  }
}
