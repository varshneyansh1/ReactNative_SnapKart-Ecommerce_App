import axios from 'axios';
import {server} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: 'loginRequest',
    });
    // hitting node login api req
    const {data} = await axios.post(
      `${server}/user/login`,
      {email, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: 'loginSuccess',
      payload: data,
    });
    await AsyncStorage.setItem('@auth', data?.token);
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.message,
    });
  }
};
// register action
export const register = formData => async dispatch => {
  try {
    dispatch({
      type: 'registerRequest',
    });
    // hit register api
    console.log("hello");
    const data = await axios.post(`${server}/user/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    

    dispatch({
      type: 'registerSucess',
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'registerFail',
      payload: error.message,
    });
  }
};

// get User Data
export const getUserData = () => async dispatch => {
  try {
    dispatch({
      type: 'getUserDataRequest',
    });
    // hitting node get user profile req
    const {data} = await axios.get(`${server}/user/profile`);
    dispatch({
      type: 'getUserDataSuccess',
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: 'getUserDataFail',
      payload: error.response.data.message,
    });
  }
};
// logout
export const logout = () => async dispatch => {
  try {
    dispatch({
      type: 'logoutRequest',
    });
    // hitting node get user profile req
    const {data} = await axios.get(`${server}/user/logout`);
    dispatch({
      type: 'logoutSuccess',
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: 'logoutFail',
      payload: error.response.data.message,
    });
  }
};
