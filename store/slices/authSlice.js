import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authState: false,
  authUser: null,
  walletAddress: null,
  userBalance: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserBalance(state, action) {
      state.userBalance = action.payload;
    },
    setWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { setAuthState, setAuthUser, setUserBalance, setWalletAddress } =
  authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectAuthUser = (state) => state.auth.authUser;
export default authSlice.reducer;
