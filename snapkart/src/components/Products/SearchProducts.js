import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductsCard from './ProductCard';

const SearchResults = () => {
  const { searchResults } = useSelector(state => state.product);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map(product => (
          <ProductsCard key={product._id} p={product} />
        ))
      ) : (
        <Text style={styles.noResultsText}>No products found</Text>
      )}
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
});
