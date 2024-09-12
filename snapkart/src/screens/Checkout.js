import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/features/auth/userActions';
import { cardPayment, createOrder, getCartData } from '../redux/features/order/orderActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation }) => {
  const { cartItems } = useSelector(state => state.order);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const totalPrice = cartItems?.reduce((sum, item) => {
    return sum + item.price * item.userQuantity;
  }, 0);

  const orderItems = cartItems.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.userQuantity,
    image: item.images[0],
    product: item._id,
  }));

  const formData = {
    shippingInfo: {
      address: user?.address,
      city: user?.city,
      country: user?.country,
    },
    orderItems,
    paymentMethod: '', // Will be set based on payment option chosen
    paymentInfo: {}, // Will be updated with Stripe transaction ID or random ID for COD
    itemPrice: totalPrice,
    tax: 0.18 * totalPrice,
    shippingCharges: 99,
    totalAmount: totalPrice + 0.18 * totalPrice + 99,
  };

  const handleCOD = async () => {
    formData.paymentMethod = 'COD';
    formData.paymentInfo.id = "CODXCV234"; // Generate a random transaction ID for COD

    dispatch(createOrder(formData));
    alert('Your Order Has Been Placed Successfully');
    await AsyncStorage.removeItem('cart');
    navigation.navigate('home');
  };

  const handleOnline = async (totalAmount) => {
    try {
      const clientSecret = await dispatch(cardPayment(totalAmount));
  
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }
  
      navigation.navigate('paymentpage', {
        totalAmount,
        clientSecret,
        formData,
      });
    } catch (error) {
      console.error('Error in handling online payment:', error);
      alert('Something went wrong, please try again later.');
    }
  };
  
  
  

  return (
    <Layout>
      <View style={Styles.container}>
        <Text style={Styles.heading}>Payment Options</Text>
        <Text style={Styles.price}>{`Total Amount : Rs ${
          totalPrice + 0.18 * totalPrice + 99
        }`}</Text>
        <View style={Styles.paymentCard}>
          <Text style={Styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity
            style={Styles.paymentBtn}
            onPress={handleCOD}>
            <Text style={Styles.paymentBtnText}>Cash On Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.paymentBtn}
            onPress={() => handleOnline(totalPrice + 0.18 * totalPrice + 99)}>
            <Text style={Styles.paymentBtnText}>
              Online (CREDIT | DEBIT CARD)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    marginVertical: 10,
    color: 'black',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: 'gray',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: 'gray',
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  paymentBtnText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Checkout;
