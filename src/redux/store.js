import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import emailReducer from "./features/email/emailSlice";
import filterSlice from "./features/auth/filterSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    email : emailReducer ,
    filter : filterSlice
  },
});
