import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  cartItems: [],
  orderDetail: null,
  error: null,
  paymentInfo: null,
  orders: [],           // For storing all orders
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

  // place order
  builder.addCase('createOrderRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('createOrderSuccess', (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase('createOrderFail', (state, action) => {
    state.error = action.payload;
  });
  // card payments
  builder.addCase('paymentRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('paymentSuccess', (state, action) => {
    state.loading = false;
    state.paymentInfo = action.payload;
  });
  builder.addCase('paymentFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // Fetch all orders
  builder.addCase('getMyOrdersRequest', (state) => {
    state.loading = true;
  });
  builder.addCase('getMyOrdersSuccess', (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase('getMyOrdersFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Fetch single order details
  builder.addCase('getOrderDetailsRequest', (state) => {
    state.loading = true;
  });
  builder.addCase('getOrderDetailsSuccess', (state, action) => {
    state.loading = false;
    state.orderDetail = action.payload;
  });
  builder.addCase('getOrderDetailsFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
