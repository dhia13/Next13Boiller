import { RESET } from "../Types";
const initialState = {
  HiddenMenus: {},
  theme: "1",
  language: "",
  state: "",
};
export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
