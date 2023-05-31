// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/userSlice";

// const middleware = [thunk];

export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    user,
  },
});
// import { persistStore } from "redux-persist";
// export const persistor = persistStore(store);
