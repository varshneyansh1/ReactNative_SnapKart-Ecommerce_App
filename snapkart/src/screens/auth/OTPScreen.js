import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputBox from '../../components/Form/InputBox'; 
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../../redux/features/auth/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useReduxStatehook } from '../../hooks/customHook';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(null);
  const route = useRoute();
  const dispatch = useDispatch();
  
  const email = route.params?.email;  // Retrieve the email passed from the registration screen


  const handleVerifyOTP = async () => {
    if (!otp) {
      return alert("Please enter the OTP");
    }
    dispatch(verifyOTP(otp, email,navigation));

  };
  const loading = useReduxStatehook(navigation, "login");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>OTP Verification</Text>
      <InputBox
        placeholder="Enter OTP"
        value={otp}
        setValue={setOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOTP}>
        <Text style={styles.verifyBtnText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  verifyBtn: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 35,
  },
  verifyBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
