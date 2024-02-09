import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from "../assets/theme"

const AttractionPage = () => {

  const route = useRoute();
  const { attractionId } = route.params;
  const [attraction, setAttraction] = useState({})
  const [events, setEvents] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://192.168.1.144:4000/api/attractions/one/${attractionId}`);
        const json = await res.json();
        setAttraction(json.singleData);
        setEvents(json.eventData)
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLinkPress(item.url)}>
      <View>
        <Image
          source={item.images ? { uri: item.images[0].url } : require('../assets/images/placeholder.jpg')}
          style={styles.eventImage}
        />
        <View>
          <Text>{item.dates?.start?.localDate}</Text>
          <Text>{item.name}</Text>
          <Text>{item._embedded?.venues[0]?.name}, {item._embedded?.venues[0]?.city?.name}, {item._embedded?.venues[0]?.state?.stateCode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: attraction.images?.length > 0 ? attraction.images[0]?.url : null
        }}
        style={styles.mainImage}
      />
      <View style={styles.attraction}>
        <Text style={styles.bandName}>{attraction.name}</Text>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.twitter[0]?.url)}>
            <Image source={require("../assets/images/twitter.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.youtube[0]?.url)}>
            <Image source={require("../assets/images/youtube.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.spotify[0]?.url)}>
            <Image source={require("../assets/images/spotify.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.url)}>
            <Image source={require("../assets/images/website_icon.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={events._embedded?.events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.eventsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ET_XLIGHT_BLUE
  },
  mainImage: {
    width: "100%",
    height: "100%",
    maxHeight: 300
  },
  attraction: {
    width: "100%",
    flexDirection: "row",
    alignContent: "space-around",
    marginTop: 20,
    marginBottom: 20
  },
  bandName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20
  },
  eventsContainer: {
    height: 125,
    width: "100%",
    gap: 10
  },
  eventImage: {
    width: 150,
    height: 75,
    marginRight: 10,
  }
});

export default AttractionPage;
