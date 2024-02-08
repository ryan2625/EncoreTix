import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const attractionPage = () => {
  const route = useRoute();
  const { attractionId } = route.params;
  return (
    <View style={styles.container}>
      <Text>{attractionId}</Text>
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