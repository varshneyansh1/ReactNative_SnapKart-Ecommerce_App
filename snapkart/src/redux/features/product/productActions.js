import axios from 'axios';
import {server} from '../../store';

// get all product Data
export const getAllProductData = () => async dispatch => {
    try {
      dispatch({
        type: 'getAllProductDataRequest',
      });
    
      const {data} = await axios.get(`${server}/product/get-all`);
      dispatch({
        type: 'getAllProductDataSuccess',
        payload: data?.products,
      });
    } catch (error) {
      dispatch({
        type: 'getAllProductDataFail',
        payload: error.response.data.message,
      });
    }
  };
// get single prod Data
export const getSingleProductData = (id) => async dispatch => {
 
    try {
      dispatch({
        type: 'getSingleProductDataRequest',
      });
      
      const {data} = await axios.get(`${server}/product/${id}`);
      
      dispatch({
        type: 'getSingleProductDataSuccess',
        payload: data?.product,
      });
    } catch (error) {
      dispatch({
        type: 'getSingleProductDataFail',
        payload: error.response.data.message,
      });
    }
  };