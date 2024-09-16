import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch} from 'react-redux';
import {createOrder} from '../redux/features/order/orderActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const PaymentComponent = ({totalAmount, clientSecret, formData}) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    handlePayment(); // Automatically trigger payment on load
  }, []);

  const handlePayment = async () => {
    try {
      // Initialize the payment sheet
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Ansh',
      });

      if (initSheet.error) {
        return Alert.alert(initSheet.error.message);
      }

      // Present the payment sheet
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      console.log(presentSheet);

      if (presentSheet.error) {
        return Alert.alert(presentSheet.error.message);
      }

      // Payment successful, update formData with payment ID
      formData.paymentInfo.id = 'CARDBNM567';
      formData.paymentMethod = 'ONLINE';

      // Dispatch the createOrder action
      dispatch(createOrder(formData));

      // Remove cart items from AsyncStorage
      await AsyncStorage.removeItem('cart');
      dispatch(getMyOrders());
      Alert.alert('Payment complete, thank you!');
      
    //  navigation.navigate('myorders');
    } catch (err) {
      console.error('Payment Error:', err);
      Alert.alert('Something went wrong, try again later!');
    }
  };

  return null; // No need to render anything
};

export default PaymentComponent;
