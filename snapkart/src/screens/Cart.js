import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PriceTable from '../components/cart/PriceTable';
import Layout from '../components/Layout/Layout';
import Cartitem from '../components/cart/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {getCartData} from '../redux/features/order/orderActions';

const Cart = ({navigation}) => {
  const {cartItems} = useSelector(state => state.order);
  const dispatch = useDispatch();

  // const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
  return (
    <Layout>
      <Text style={styles.heading}>
        {cartItems?.length > 0
          ? `You Have ${cartItems?.length} Item Left In Your Cart`
          : 'OOPS Your Cart Is EMPTY !'}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map(item => (
              <Cartitem item={item} key={item._id} />
            ))}
          </ScrollView>
          <View>
            <PriceTable title={'Price'} price={999} />
            <PriceTable title={'Tax'} price={1} />
            <PriceTable title={'Shipping'} price={99} />
            <View style={styles.grandTotal}>
              <PriceTable title={'Grand Total'} price={1001} />
            </View>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={() => navigation.navigate('checkout')}>
              <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#ffffff',
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#000000',
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default Cart;
