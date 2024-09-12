import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  addProductToCart,
  getCartData,
  removeProductFromCart,
} from '../../redux/features/order/orderActions';
import {useNavigation} from '@react-navigation/native';

const Cartitem = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [qty, setQty] = useState(item.userQuantity);
  if (qty === 0) navigation.push('cart');
  // Handle function for + -
  const handleAddQty = item => {
    if (qty === 10) return alert('you cannot add more than 10 quantity');
    dispatch(addProductToCart(item));
    setQty(prev => prev + 1);
  };
  const handleRemoveQty = id => {
    dispatch(removeProductFromCart(id));
    setQty(prev => prev - 1);
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: item?.images[0].url}} style={styles.image} />
      <View>
        <Text style={styles.name}> {item?.name.substring(0, 26)}</Text>
        <Text style={styles.name}> Price :Rs. {item?.price} </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnQty}
          onPress={() => handleRemoveQty(item._id)}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>{qty}</Text>
        <TouchableOpacity
          style={styles.btnQty}
          onPress={() => handleAddQty(item)}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    objectFit: 'contain',
  },
  name: {
    fontSize: 10,
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnQty: {
    backgroundColor: 'lightgray',
    width: 40,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
    color: 'black',
  },
});
export default Cartitem;
