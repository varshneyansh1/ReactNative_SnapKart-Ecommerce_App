import axios from 'axios';
import {server} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
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
    console.log(error);
    dispatch({
      type: 'loginFail',
      payload: error.message,
    });
  }
};
// register action
// export const register = formData => async dispatch => {
//   try {
//     dispatch({
//       type: 'registerRequest',
//     });
//     // hit register api
//     const data = await axios.post(`${server}/user/signup`, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     dispatch({
//       type: 'registerSucess',
//       payload: data.message,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: 'registerFail',
//       payload: error.message,
//     });
//   }
// };
// Action to send OTP
export const otpSignup = (formData,navigation) => async dispatch => {
  try {
    dispatch({type: 'registerRequest'});
    const {data} = await axios.post(`${server}/user/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({type: 'registerSuccess', payload: data.message});
    Alert.alert(data.message);
    navigation.navigate('login');
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'registerFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// get User Data
export const getUserData = () => async dispatch => {
  try {
    dispatch({
      type: 'getUserDataRequest',
    });

    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('@auth');

    // Send the token in the Authorization header
    const {data} = await axios.get(`${server}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: 'getUserDataSuccess',
      payload: data?.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'getUserDataFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({type: 'logoutRequest'});

    const token = await AsyncStorage.getItem('@auth'); // Get token from storage
    const {data} = await axios.get(`${server}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'logoutSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'logoutFail',
      payload: error.response?.data?.message || 'Logout failed',
    });
  }
};
