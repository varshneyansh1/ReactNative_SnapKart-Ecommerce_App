import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetails} from '../../redux/features/order/orderActions';
import moment from 'moment';

const OrderDetails = ({route}) => {
  const {orderId} = route.params;

  const dispatch = useDispatch();
  const {orderDetail, loading, error} = useSelector(state => state.order);

  useEffect(() => {
 
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Order Details</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginVertical: 300}}
          />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <ScrollView>
            {/* Order ID and status */}
            <Text style={styles.text}>Order ID: {orderDetail?._id}</Text>
            <Text style={styles.text}>Status: {orderDetail?.orderStatus}</Text>
            <Text style={styles.text}>
              Order Placed On: {moment(orderDetail?.createdAt).format('MMMM Do YYYY, h:mm a')}
            </Text>

            {/* Order items */}
            {orderDetail?.orderItems?.map(item => (
              <View key={item?.product} style={styles.itemContainer}>
                <Text style={styles.text}>Product: {item?.name}</Text>
                <Text style={styles.text}>Price: Rs.{item?.price}</Text>
                <Text style={styles.text}>Quantity: {item?.quantity}</Text>
              </View>
            ))}

            {/* Shipping Charges and Taxes */}
            <View style={styles.priceDetails}>
              <Text style={styles.text}>
                Payment Method: {orderDetail?.paymentMethod}
              </Text>
              <Text style={styles.text}>Tax: ₹{orderDetail?.tax}</Text>
              <Text style={styles.text}>
                Shipping Charge: ₹{orderDetail?.shippingCharges}
              </Text>
              <Text style={styles.text}>
                List price: ₹{orderDetail?.itemPrice}
              </Text>
              <Text style={styles.text}>
                Total Amount: ₹{orderDetail?.totalAmount}
              </Text>
            </View>

            
          </ScrollView>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
    objectFit: 'contain',
  },
  priceDetails: {
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
  },
});

export default OrderDetails;
