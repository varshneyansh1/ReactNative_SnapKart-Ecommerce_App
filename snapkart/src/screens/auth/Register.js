import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../components/Form/InputBox';
import {useDispatch} from 'react-redux';
import {otpSignup} from '../../redux/features/auth/userActions';
import {useReduxStateHook} from '../../hooks/customHook';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
 
  const [country, setCountry] = useState('India');

  const loginImage =
    'https://cdn3d.iconscout.com/3d/premium/thumb/login-template-6251837-5117017.png?f=webp';

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !name ||
      !address ||
      !city ||
      !phone
    ) {
      return alert('Please provide all required fields');
    }

    const formData = {
      email,
      password,
      name,
      address,
      city,
      phone,
      country: 'India',
    };

    // Dispatch the OTP Signup Action
    dispatch(otpSignup(formData,navigation));
  
  };
  const loading = useReduxStateHook(navigation, 'login');
  return (
    <View style={styles.container}>
      <Image source={{uri: loginImage}} style={styles.image} />
      <InputBox
        placeholder="Enter Your Name"
        value={name}
        setValue={setName}
        autoComplete="name"
      />
      <InputBox
        placeholder="Enter Your Email"
        value={email}
        setValue={setEmail}
        autoComplete="email"
      />
      <InputBox
        placeholder="Enter Your Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <InputBox
        placeholder="Enter Your Address"
        value={address}
        setValue={setAddress}
        autoComplete="address-line1"
      />
      <InputBox
        placeholder="Enter Your City"
        value={city}
        setValue={setCity}
        autoComplete="address-level2"
      />
      <InputBox
        placeholder="Enter Your Phone No."
        value={phone}
        setValue={setPhone}
        keyboardType="phone-pad"
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>
          Already a user?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('login')}>
            Login!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBtn: {
    backgroundColor: '#000',
    width: '80%',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  registerBtnText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 18,
  },
  link: {
    color: 'red',
  },
});

export default Register;
