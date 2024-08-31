import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  productDetail:null,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  // get all product data
  builder.addCase('getAllProductDataRequest', (state) => {
    state.loading = true;
  });
  builder.addCase('getAllProductDataSuccess', (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase('getAllProductDataFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // get single product data
  builder.addCase('getSingleProductDataRequest', (state) => {
    state.loading = true;
  });
  builder.addCase('getSingleProductDataSuccess', (state, action) => {
    state.loading = false;
    state.productDetail = action.payload;
  });
  builder.addCase('getSingleProductDataFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
