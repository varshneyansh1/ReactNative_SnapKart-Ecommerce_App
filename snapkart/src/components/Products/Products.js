import {View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import ProductsCard from './ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductData} from '../../redux/features/product/productActions';

const Products = () => {
  const {products} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductData());
    }
  }, [dispatch]);

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / 2 - 20;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.productContainer}>
        {products && products.length > 0 ? (
          products.map(p => (
            <View key={p._id} style={{width: cardWidth, marginBottom: 20}}>
              <ProductsCard p={p} />
            </View>
          ))
        ) : (
          <ActivityIndicator size="large" color="#ccae62" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop:20,
    paddingBottom: 30, // To provide some space for the footer
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Products;
