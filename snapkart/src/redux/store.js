import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/auth/userReducer';
import { productReducer } from './features/product/productReducer';
import { orderReducer } from './features/order/orderReducer';

export default configureStore({
  reducer: {
    user: userReducer,         // key 'user' corresponds to userReducer
    product: productReducer,    // key 'product' should correspond to productReducer
    order:orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// host
// export const server = 'https://reactnative-snapkart-ecommerce-app.onrender.com/api/v1';
export const server = 'http://10.21.0.172:8080/api/v1';
 //export const server = 'http://192.168.137.79:8080/api/v1';
