import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
  const {user,error} = useSelector(state => state.user);
  console.log(error)
  useEffect(() => {
    dispatch(getUserData());
    
  }, [dispatch]);
  return (
    <Layout>
      <Header />
      <ScrollView>
      <Categories />
      <Banner />
      <Products />
      </ScrollView>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
