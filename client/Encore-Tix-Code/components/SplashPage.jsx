import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashPage = () => {
  return (
    <View style={styles.container}>
      <Text>SplashPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashPage;