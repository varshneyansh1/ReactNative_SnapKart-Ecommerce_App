import {createReducer} from '@reduxjs/toolkit';

export const userReducer = createReducer(
  {
    token: null,
    user: null,
    isAuth: false,
    loading: false,
    error: null,
    message: null,
  },
  builder => {
    // login case
    builder.addCase('loginRequest', (state, action) => {
      state.loading = true;
    });
    builder.addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuth = true;
      state.token = action.payload.token;
    });
    builder.addCase('loginFail', (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
    // error case message
    builder.addCase('clearError', state => {
      state.error = null;
    });
    builder.addCase('clearMessage', state => {
      state.message = null;
    });

    // get user data
    builder.addCase('getUserDataRequest', (state, action) => {
      state.loading = true;
    });
    builder.addCase('getUserDataSuccess', (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase('getUserDataFail', (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });

    // Register
    builder.addCase('registerRequest', (state, action) => {
      state.loading = true;
    });
    builder.addCase('registerSuccess', (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.message = action.payload;
    });
    builder.addCase('registerFail', (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
    // OTP Signup cases
    builder.addCase('otpRequest', state => {
      state.loading = true;
    });
    builder.addCase('otpSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase('otpFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // OTP Verification cases
    builder.addCase('otpVerifyRequest', (state) => {
      state.loading = true;
    });
    builder.addCase('otpVerifySuccess', (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.message = action.payload;
    });
    builder.addCase('otpVerifyFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // logout
    builder.addCase('logoutRequest', (state, action) => {
      state.loading = true;
    });
    builder.addCase('logoutSuccess', (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      state.message = action.payload;
    });
    builder.addCase('logoutFail', (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
  },
);
