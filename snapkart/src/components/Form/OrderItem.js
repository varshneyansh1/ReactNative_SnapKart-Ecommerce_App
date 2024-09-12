import { View, Text, StyleSheet } from "react-native";
import React from "react";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderinfo}>
        <Text style={styles.txtheading}>Order ID: {order._id}</Text>
        <Text style={styles.txtheading}>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
      </View>

      {/* Loop over the orderItems array to display each product */}
      {order.orderItems.map((item) => (
        <View key={item._id} style={styles.productInfo}>
          <Text style={styles.txtheading}>Product Name: {item.name}</Text>
          <Text style={styles.txtheading}>Price: Rs. {item.price}</Text>
          <Text style={styles.txtheading}>Quantity: {item.quantity}</Text>
        </View>
      ))}

      <Text style={styles.txtheading}>Total Amount: Rs. {order.totalAmount}</Text>
      <Text style={styles.status}>Order Status: {order.orderStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 18,
    borderRadius: 10,
  },
  txtheading: {
    color: "black",
  },
  orderinfo: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
  },
  productInfo: {
    paddingTop: 5,
  },
  status: {
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
    color: "black",
  },
});

export default OrderItem;
