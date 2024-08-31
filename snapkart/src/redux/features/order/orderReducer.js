import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  cartItems: [],
  orderDetail: null,
  error: null,
};

export const orderReducer = createReducer(initialState, builder => {
  // add items to cart
  builder.addCase('addProductRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('addProductSuccess', (state, action) => {
    state.loading = false;
  });
  builder.addCase('addProductFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // remove items from cart
  builder.addCase('removeProductRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('removeProductSuccess', (state, action) => {
    state.loading = false;
  });
  builder.addCase('removeProductFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // retrieve items from cart
  builder.addCase('getProductRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('getProductSuccess', (state, action) => {
    state.loading = false;
    state.cartItems = action.payload;
  });
  builder.addCase('getProductFail', (state, action) => {
    state.error = action.payload;
  });

});
