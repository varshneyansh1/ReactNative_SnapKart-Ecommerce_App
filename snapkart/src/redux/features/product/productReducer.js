import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  catproducts: [],
  productDetail: null,
  error: null,
  searchResults: [],
};

export const productReducer = createReducer(initialState, builder => {
  // get all product data
  builder.addCase('getAllProductDataRequest', state => {
    state.loading = true;
  });
  builder.addCase('getAllProductDataSuccess', (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase('getAllProductDataFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // get single product data
  builder.addCase('getSingleProductDataRequest', state => {
    state.loading = true;
  });
  builder.addCase('getSingleProductDataSuccess', (state, action) => {
    state.loading = false;
    state.productDetail = action.payload;
  });
  builder.addCase('getSingleProductDataFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // Get products by category
  builder.addCase('getProductsByCategoryRequest', state => {
    state.loading = true;
  });
  builder.addCase('getProductsByCategorySuccess', (state, action) => {
    state.loading = false;
    state.catproducts = action.payload;
  });
  builder.addCase('getProductsByCategoryFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Filter products locally by search term and category
  builder.addCase('filterProductsBySearch', (state, action) => {
    const searchKey = action.payload.toLowerCase();
    state.searchResults = state.products.filter(
      product =>
        product.name.toLowerCase().includes(searchKey) ||
        product.category.toLowerCase().includes(searchKey),
    );
  });
});
