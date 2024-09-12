import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import ProductsCard from './ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsByCategory} from '../../redux/features/product/productActions';
import {useRoute} from '@react-navigation/native';
import Header from '../Layout/Header';

const CatProducts = () => {
  const route = useRoute();
  const {categoryName} = route.params;
  const {catproducts} = useSelector(state => state.product);
  const products = catproducts;
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryName) {
      dispatch(getProductsByCategory(categoryName)); // Fetch products by category
    }
  }, [dispatch, categoryName]);

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <Header />
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
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default CatProducts;
