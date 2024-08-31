import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout/Layout';
import {userDataa} from '../../data/userData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import { getUserData } from '../../redux/features/auth/userActions';

const Account = ({navigation}) => {
  //get user
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Layout>
      <View style={styles.container}>
        <Image source={{uri: userDataa.profilePic}} style={styles.image} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.name}>
            Hi
            <Text style={{color: 'green'}}> {user.name}</Text>
          </Text>
          <Text style={{color: 'black'}}>email id : {user.email}</Text>
          <Text style={{color: 'black'}}>Mobile number : {user.phone}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.heading}>Account Setting</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('profile', {id: user._id})}>
            <AntDesign style={styles.btnText} name="edit" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('myorders', {id: user._id})}>
            <AntDesign style={styles.btnText} name="bars" />
            <Text style={styles.btnText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('notifications')}>
            <AntDesign style={styles.btnText} name="bells" />
            <Text style={styles.btnText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('adminPanel', {id: user._id})
            }>
            <AntDesign style={styles.btnText} name="windows" />
            <Text style={styles.btnText}>Admin Panel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
  },
  btnContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    color: 'black',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
  },
  btnText: {
    fontSize: 15,
    marginRight: 10,
    color: 'black',
  },
});
export default Account;
