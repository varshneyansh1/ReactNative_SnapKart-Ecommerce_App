import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";

import OrderItem from "../../components/Form/OrderItem";
import { orderData } from "../../data/OrderData";

const MyOrders = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>
        <ScrollView>
          {orderData.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default MyOrders;