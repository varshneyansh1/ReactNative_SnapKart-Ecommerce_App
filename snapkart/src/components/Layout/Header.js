import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Header = () => {
  const [searchText, setSearchText] = useState('');
  // fxn for search
  const handleSearch = () => {
    console.log(searchText);
    setSearchText('')
  };
  return (
    <View style={{height: 90, backgroundColor: 'lightgray'}}>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity>
          <FontAwesome name="search" 
          style={styles.icon}
          onPress={handleSearch}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  inputBox: {
    borderWidth: 0.3,
    width: '100%',
    position: 'absolute',
    left: 10,
    height: 40,
    color: '#000000',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    position: 'absolute',
    left: '95%',
  },
  icon: {
    fontSize: 18,
    color: '#000000',
  },
});
