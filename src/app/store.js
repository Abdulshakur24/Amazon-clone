import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import basketReducer from "../features/baskets";

export default configureStore({
  reducer: {
    users: userReducer,
    baskets: basketReducer,
  },
});
