import { REGISTER, REGISTER_ERROR, PREREGISTER } from "../Types";
const initialState = {
  type: "",
  username: "",
  email: "",
  name: "",
  password: "",
  birthdate: "",
  error: {
    errorType: "",
    errorMessage: "",
  },
  forgotenPasswordEmail: "",
};
export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        RegisterData: action.payload,
      };
    case PREREGISTER:
      return {
        RegisterData: action.payload,
      };
    case REGISTER_ERROR:
      return {
        RegisterData: action.payload,
      };
    default:
      return state;
  }
}
