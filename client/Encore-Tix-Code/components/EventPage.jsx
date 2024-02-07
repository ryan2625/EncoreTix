import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventPage = () => {
  return (
    <View style={styles.container}>
      <Text>EventPage</Text>
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

export default EventPage;