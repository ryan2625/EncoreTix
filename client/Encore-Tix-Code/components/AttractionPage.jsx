import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from "moment"
import { COLORS } from "../assets/theme"

/**
 * @component HomePage
 * 
 * Individual attraction page that displays attraction image, name, external links, as well as upcoming events
 * with name, date, and location.
 */

const AttractionPage = () => {

  const route = useRoute();
  const { attractionId } = route.params;
  const [attraction, setAttraction] = useState({})
  const [events, setEvents] = useState({})
  const [loader, setLoader] = useState(true)
  //Used to try fetching data if we receive a fault/throttling error. Will only attempt to fetch twice.
  const [mounted, setMounted] = useState(false)

  /**
   * useEffect will make a call to the endpoint /api/attractions/one/${attractionId} to fetch the attraction's
   * details. If we receive an error fetching the data, we will try to fetch it one more time after 2 seconds.
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://hosted-tix.onrender.com/api/attractions/one/${attractionId}`);
        const json = await res.json();
        setAttraction(json.singleData);
        //console.log(json.eventData.hasOwnProperty("fault"))
        if (json.eventData.hasOwnProperty("fault") && !(mounted)) {
          setMounted(true)
          setTimeout(fetchData, 2000);
        } else {
          setEvents(json.eventData);
          setLoader(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /**
   * Function: handleLinkPress
   * @param {string} url Navigate to specified URL
   * @returns If url is blank, there is no URL to navigate to so we return.
   */

  const handleLinkPress = (url) => {
    if (!url) {
      return
    }
    Linking.openURL(url);
  };

  const formatDate = (date) => {
    const formattedDate = moment(date).format('dddd, MMMM DD, YYYY');
    return formattedDate.toUpperCase();
  }

  /**
   * Function: renderItem
   * Iterates through FlatList and renders the card based on the data passed through the item object.
   * @param {Object} item: Individual event to display.
   * @returns Image and text to be rendered in the attractions container.
   */

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item.url)}
      accessibilityLabel="Show event details on website.">
      <View style={styles.individualEvent}>
        <Image
          source={item.images ? { uri: item.images[0]?.url } : require('../assets/images/placeholder.jpg')}
          style={styles.eventImage}
          accessibilityLabel="Event image."
        />
        <View style={{ justifyContent: "center", width: 185 }}>
          <Text numberOfLines={1}>{formatDate(item.dates?.start?.localDate)}</Text>
          <Text numberOfLines={1} style={{ fontWeight: "bold", marginTop: 5, marginBottom: 5, width: "100%" }}>{item.name}</Text>
          <Text numberOfLines={1} >{item._embedded?.venues?.[0]?.name}, {item._embedded?.venues?.[0]?.city?.name}, {item._embedded?.venues?.[0]?.state?.stateCode}</Text>
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
        accessibilityLabel="Attraction Image."
      />
      <View style={styles.attraction}>
        <Text style={styles.bandName}>{attraction.name}</Text>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.twitter[0]?.url)}
            accessibilityLabel="Open twitter page of the attraction.">
            <Image source={require("../assets/images/twitter.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.youtube[0]?.url)}
            accessibilityLabel="Open youtube page of the attraction.">
            <Image source={require("../assets/images/youtube.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.externalLinks?.spotify[0]?.url)}
            accessibilityLabel="Open spotify page of the attraction.">
            <Image source={require("../assets/images/spotify.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(attraction.url)}
            accessibilityLabel="Open website of the attraction.">
            <Image source={require("../assets/images/website_icon.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {/*Conditionally render loader if data is still being fetched. After data is fetched, display the events list if there are any or the text No upcoming events.*/}
      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
        </View>
      ) : (
        <View style={{ height: "100%", flex: 1 }}>
          {events._embedded?.events ? (
            <FlatList
              data={events._embedded.events}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.eventsContainer}
            />
          ) : (
            <Text style={{ textAlign: "center" }}>No upcoming events</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ET_XLIGHT_BLUE
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
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
    marginBottom: 15,
    padding: 15,
  },
  eventImage: {
    height: 120,
    width: "100%",
    maxWidth: 150,
    marginRight: 10
  },
  individualEvent: {
    height: 120,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginBottom: 15
  }
});

export default AttractionPage;
