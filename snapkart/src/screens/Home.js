import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import Categories from '../components/Category/Category';
import Banner from '../components/Banner/Banner';
import Products from '../components/Products/Products';
import Header from '../components/Layout/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from '../redux/features/auth/userActions';

const Home = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Layout>
      <Header />
      <Categories />
      <Banner />
      <Products />
      <View>
        <Text>Home</Text>
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
