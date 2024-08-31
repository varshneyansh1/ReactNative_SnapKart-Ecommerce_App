import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleProductData} from '../redux/features/product/productActions';

const ProductDetails = ({route}) => {
  const {params} = route;

  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);

  const {productDetail} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?._id) {
      dispatch(getSingleProductData(params._id));
    }
  }, [dispatch, params?._id]);

  useEffect(() => {
    setPDetails(productDetail);
  }, [productDetail]);

  // Handle function for + -
  const handleAddQty = () => {
    if (qty === 10) return alert('you cant add more than 10 quantity');
    setQty(prev => prev + 1);
  };
  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty(prev => prev - 1);
  };

  return (
    <Layout>
      <View style={styles.imgContainer}>
        {pDetails?.images && pDetails.images.length > 0 && (
          <Image source={{uri: pDetails.images[0].url}} style={styles.image} />
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{pDetails?.name}</Text>
        <Text style={styles.title}>Price : Rs. {pDetails?.price}</Text>
        <Text style={styles.desc}>Details : {pDetails?.description} Rs. </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => alert(`${qty} items added to cart`)}
            disabled={pDetails?.stock <= 0}>
            <Text style={styles.btnCartText}>
              {pDetails?.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text style={{color: 'black'}}>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: 'white',
    margin: 20,
    height: '30%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 250,
    objectFit: 'contain',
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 22,
    
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
  },
  desc: {
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'justify',
    marginVertical: 10,
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: '#000000',
    // marginVertical: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  btnCartText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
export default ProductDetails;
