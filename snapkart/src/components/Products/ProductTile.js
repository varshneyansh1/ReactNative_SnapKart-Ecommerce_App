import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductTile = ({ product }) => {
  return (
    <View style={styles.tileContainer}>
      <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#777',
  },
});
