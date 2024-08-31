import axios from 'axios';
import {server} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

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
      cart[index].quantity += product.userQuantity;
    } else {
      // If the product doesn't exist, add it with the given quantity
      cart.push(product);
    }

    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    Alert.alert('item added');
    Snackbar.show({
      text: 'Item Added TO Cart',
      duration: Snackbar.LENGTH_SHORT,
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

      const index = cart.findIndex(item => item.id === productId);
      if (index > -1) {
        // If the product exists, reduce its quantity
        cart[index].quantity -= quantityToRemove;

        // Remove the product if the quantity is less than or equal to zero
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        Snackbar.show({
          text: 'Product quantity updated or removed from cart!',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          text: 'Product not found in cart ',
          duration: Snackbar.LENGTH_SHORT,
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