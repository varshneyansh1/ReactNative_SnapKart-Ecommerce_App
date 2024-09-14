import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export const useReduxStatehook = (navigation, path = 'login') => {
  const {loading, error, message} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert(error);
      dispatch({type: 'clearError'});
    }
    if (message) {
      Alert.alert(message);
      dispatch({type: 'clearMessage'});
      navigation.reset({
        index: 0,
        routes: [{name: path}],
      });
    }
    [error, dispatch, message];
  });
  return loading;
};