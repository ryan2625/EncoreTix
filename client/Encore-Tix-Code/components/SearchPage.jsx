import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Text>SearchPage</Text>
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

export default SearchPage;