import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {filterProductsBySearch} from '../../redux/features/product/productActions';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // fxn for search
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      dispatch(filterProductsBySearch(searchText));
      setSearchText('');
      navigation.navigate('SearchResults'); // Navigate to the search results screen
    }
  };
  return (
    <View style={{height: 90, backgroundColor: '#ccae62'}}>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={searchText}
          onSubmitEditing={handleSearch}  // Trigger search on keyboard "enter"
          returnKeyType="search"  // Change the keyboard return key to a search icon
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity>
          <FontAwesome
            name="search"
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
    paddingLeft: 30,
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
