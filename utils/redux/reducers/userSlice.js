import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  username: "",
  name: "",
  email: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { username, name, email, image, tokens } = action.payload;
      return {
        ...state,
        logged: true,
        name: name,
        username: username,
        email: email,
        image: image,
        tokens: tokens,
      };
    },
    logout(state, action) {
      console.log("nigga");
      return {
        ...initialState,
      };
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { login, logout } = userSlice.actions;

// Export the slice reducer as the default export
export default userSlice.reducer;
