import axios from 'axios';
import {server} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';

// add item to cart
export const addProductToCart = product => async dispatch => {
  try {
    dispatch({
      type: 'addProductRequest',
    });
    const existingCart = await AsyncStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const index = cart.findIndex(item => item._id === product._id);
    if (index > -1) {
      // If the product exists, update its quantity
      cart[index].userQuantity += product.userQuantity;
    } else {
      // If the product doesn't exist, add it with the given quantity
      cart.push(product);
    }

    await AsyncStorage.setItem('cart', JSON.stringify(cart));

    Snackbar.show({
      text: 'Item Added To Cart',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#33d9b2',
    });
    dispatch({
      type: 'addProductSucess',
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'addProductFail',
      payload: error.message,
    });
  }
};
// remove item from cart
export const removeProductFromCart =
  (productId, quantityToRemove = 1) =>
  async dispatch => {
    try {
      dispatch({
        type: 'removeProductRequest',
      });
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      const index = cart.findIndex(item => item._id === productId);
      if (index > -1) {
        // If the product exists, reduce its quantity
        cart[index].userQuantity -= quantityToRemove;

        // Remove the product if the quantity is less than or equal to zero
        if (cart[index].userQuantity <= 0) {
          cart.splice(index, 1);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        Snackbar.show({
          text: 'Product quantity updated or removed from cart!',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#33d9b2',
        });
      } else {
        Snackbar.show({
          text: 'Product not found in cart ',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#33d9b2',
        });
      }
      dispatch({
        type: 'removeProductSucess',
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'removeProductFail',
        payload: error.message,
      });
    }
  };
// get Cart product item
export const getCartData = () => async dispatch => {
  try {
    dispatch({
      type: 'getProductRequest',
    });
    const existingCart = await AsyncStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    dispatch({
      type: 'getProductSuccess',
      payload: cartItems,
    });
  } catch (error) {
    dispatch({
      type: 'getProductFail',
      payload: error.response.data.message,
    });
  }
};
// create/place order

export const createOrder = formData => async dispatch => {
  try {
    dispatch({
      type: 'createOrderRequest',
    });
    const token = await AsyncStorage.getItem('@auth');

    // hit order create api
    const data = await axios.post(`${server}/order/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: 'createOrderSuccess',
      payload: 'data.message',
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'registerFail',
      payload: 'error.message',
    });
  }
};
// accept payment

// Redux action for card payment
export const cardPayment = totalAmount => async dispatch => {
  try {
    dispatch({type: 'paymentRequest'});
    const token = await AsyncStorage.getItem('@auth');

    const {data} = await axios.post(
      `${server}/order/payments`,
      {totalAmount},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({type: 'paymentSuccess', payload: data.client_secret});
    return data.client_secret;
  } catch (error) {
    dispatch({type: 'paymentFail', payload: error.message});
    throw new Error(error.message);
  }
};

// Get all orders for a user
export const getMyOrders = () => async dispatch => {
  try {
    dispatch({type: 'getMyOrdersRequest'});

    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('@auth');
    const {data} = await axios.get(`${server}/order/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: 'getMyOrdersSuccess',
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: 'getMyOrdersFail',
      payload: error.response.data.message,
    });
  }
};

// Get single order details
export const getOrderDetails = orderId => async dispatch => {
  console.log('===entered actions=== ');
  try {
    dispatch({type: 'getOrderDetailsRequest'});

    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('@auth');
    const {data} = await axios.get(`${server}/order/my-orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: 'getOrderDetailsSuccess',
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: 'getOrderDetailsFail',
      payload: error.response.data.message,
    });
  }
};
