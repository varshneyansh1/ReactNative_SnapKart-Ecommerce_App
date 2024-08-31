import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Footer from './Footer';

const Layout = ({children}) => {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
        </View>
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the screen
  },
  content: {
    flex: 1, // Take up remaining space above the footer
  },
  footer: {
    width: '100%',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#fff', // Ensure footer has a background color to avoid transparency issues
  },
});

export default Layout;
