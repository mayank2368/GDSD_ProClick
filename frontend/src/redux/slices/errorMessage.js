/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const messageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { ErrorMessage: action.payload };
    },
    clearMessage: () => {
      return { ErrorMessage: null };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;

export const selectErrorMessage = ({ error }) => error;

export default reducer;
