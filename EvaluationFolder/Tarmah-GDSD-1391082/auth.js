/* eslint-disable no-unused-vars */

/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./errorMessage";
import { localUserStorageHelper } from "../../utils";

import AuthService from "../services/auth.service";

const user = localUserStorageHelper.load();

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, firstName, lastName, role }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        email,
        password,
        firstName,
        lastName,
        role
      );
      thunkAPI.dispatch(clearMessage());
      return response.data;
    } catch (error) {
      const message =
        error.response.data.error.reason.field ||
        error.response.data.error.reason.errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      thunkAPI.dispatch(clearMessage());
      return { user: data };
    } catch (error) {
      const message =
        error.response.data.error.reason.field ||
        error.response.data.error.reason.errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isSignedUp: true, isLoggedIn: true, user }
  : { isSignedUp: false, isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isSignedUp = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isSignedUp = false;
      state.user = null;
    },
  },
});

export const selectUser = ({ auth }) => auth;
export const selectUserRole = createSelector(
  selectUser,
  (auth) => auth?.user?.user?.role
);

export const selectUserID = createSelector(
  selectUser,
  (auth) => auth?.user?.user?.id
);
export const selectUserFirstName = createSelector(
  selectUser,
  (auth) => auth?.user?.user?.first_name
);
export const selectUserLastName = createSelector(
  selectUser,
  (auth) => auth?.user?.user?.last_name
);
export const selectUserEmailId = createSelector(
  selectUser,
  (auth) => auth?.user?.user?.emailId
);
export const selectUserToken = createSelector(
  selectUser,
  (auth) => auth?.user?.token
);

export default authSlice.reducer;
