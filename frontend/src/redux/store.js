/*
 * Contributor:  Tarmah Bin Iqbal
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/errorMessage";

export const store = configureStore({
  reducer: { auth: authReducer, error: messageReducer },
});
