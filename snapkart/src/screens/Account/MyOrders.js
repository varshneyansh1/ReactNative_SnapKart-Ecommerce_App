import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import OrderItem from '../../components/Form/OrderItem';
import {useDispatch, useSelector} from 'react-redux';
import {getMyOrders} from '../../redux/features/order/orderActions';
import {useNavigation} from '@react-navigation/native';


const MyOrders = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {orders, loading, error} = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleOrderClick = orderId => {
    navigation.navigate('orderDetails', {orderId});
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginVertical: 300}}
          />
        ) : error ? (
          <Text style={{color: 'black'}}>Error: {error}</Text>
        ) : (
          <ScrollView>
            {orders?.map(order => (
              <TouchableOpacity
                key={order._id}
                onPress={() => handleOrderClick(order._id)}>
                <OrderItem order={order} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    padding: 12,
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MyOrders;
