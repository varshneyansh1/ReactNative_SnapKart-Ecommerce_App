import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {addProductToCart} from '../../redux/features/order/orderActions';
import {useDispatch} from 'react-redux';

const ProductsCard = ({p}) => {
  const navigation = useNavigation();

  const handleMoreButton = id => {
    navigation.navigate('productDetails', {_id: id});
  };
  const dispatch = useDispatch();
  const handleAddToCart = product => {
    dispatch(addProductToCart(product));
  };

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{uri: p?.images[0].url}} />
      <Text style={styles.cardTitle}>{p?.name}</Text>
      <Text style={styles.cardDesc}>
        {p?.description.substring(0, 30)} ...more
      </Text>
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleMoreButton(p?._id)}>
          <Text style={styles.btnText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCart}
          onPress={() => handleAddToCart(p)}>
          <Text style={styles.btnText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  cardImage: {
    height: 80,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  BtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    backgroundColor: '#000000',
    height: 25,
    width: '48%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnCart: {
    backgroundColor: '#33d9b2',
    height: 25,
    width: '48%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductsCard;
