import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PriceTable = ({ price, title }) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>{title}</Text>
      <Text style={{color: 'black'}}>Rs. {price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
export default PriceTable;