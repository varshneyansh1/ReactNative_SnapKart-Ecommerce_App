import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import {NavigationContainer} from '@react-navigation/native';
import Checkout from './screens/Checkout';
import Payments from './screens/Payments';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Account from './screens/Account/Account';
import Notifications from './screens/Account/Notifications';
import MyOrders from './screens/Account/MyOrders';
import Dashboard from './screens/Admin/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentPage from './screens/PaymentPage';
import CatProducts from './components/Products/CatProduct.js';
import OrderDetails from './screens/Account/OrderDetails.js';
import OTPScreen from './screens/auth/OTPScreen.js';
import SearchResults from './components/Products/SearchProducts.js';

const Stack = createNativeStackNavigator();
const Main = () => {
  const [isAuth, setIsAuth] = useState(null);

  //get user
  useEffect(() => {
    const getUserLocalData = async () => {
      let data = await AsyncStorage.getItem('@auth');
      setIsAuth(data);
    };
    getUserLocalData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="adminPanel"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="myorders"
          component={MyOrders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="orderDetails"
          component={OrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="account"
          component={Account}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="paymentpage"
          component={PaymentPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="productDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="catProducts"
          component={CatProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{headerShown: false}}
        />

        { !isAuth  && (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OTPVerification"
              component={OTPScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;