import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {categoriesData} from '../../data/CategoriesData';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
    const navigation = useNavigation()
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categoriesData?.map(item => (
          <View key={item._id}>
            <TouchableOpacity 
            style={styles.catConatiner}
            onPress={()=>navigation.navigate(item.path)}
            >
              <FontAwesome name={item.icon} style={styles.catIcon} />
              <Text style={styles.catTitle}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    flexDirection: 'row',
  },
  catConatiner: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catIcon: {
    fontSize: 28,
    verticalAlign: 'top',
  },
  catTitle: {
    fontSize: 12,
  },
});
