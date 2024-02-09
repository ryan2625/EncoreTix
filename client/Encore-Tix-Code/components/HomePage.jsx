import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../assets/theme";

/**
 * @component HomePage
 * 
 * Entry point of the application with a search feature calling our backend to fetch data from Ticketmaster
 * Discovery API. 
 */

const HomePage = () => {
  const navigation = useNavigation();
  const [attractions, setAttractions] = useState({});
  const [searchTerm, setSearchTerm] = useState("Phish");
  const [clicked, setClicked] = useState(false);
  const [loader, setLoader] = useState(true)

  //useEffect triggered by handleSearch after checking if search term is empty to ensure we have the most recent and updated state

  useEffect(() => {
    handlePress();
  }, [clicked]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchTerm("Phish");
    }
    setClicked(!clicked);
  };

  /**
   * Function: handlePress
   * Description: Call our backend endpoint /api/attractions/${searchTerm} using the searchTerm the user typed in the 
   * search bar. This will filter results from the Discovery API handled in the backend. 
   * @async
   * @throws {Error} HTTP status not OK.
   */

  async function handlePress() {
    try {
      const response = await fetch(`https://busy-lime-binturong-garb.cyclic.app/api/attractions/${searchTerm}`);
      if (!response.ok) {
        throw new Error('404 Not Found');
      }
      const data = await response.json();
      setAttractions(data);
      setLoader(false)
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  }

  function handleChange(text) {
    setSearchTerm(text);
  }

  /**
   * Function: renderItem
   * Iterates through FlatList and renders the card based on the data passed through the item object.
   * @param {Object} item: Individual attraction event 
   * @returns Image and text to be rendered in the attractions container.
   */

  const renderItem = ({ item }) => (
    <TouchableOpacity
      //Navigate to AttractionPage and pass in the attractionId 
      onPress={() => navigation.navigate('Attraction', { attractionId: item.id })}
      style={styles.attractionContainer}
      accessibilityLabel="Open attraction details."
    >
      <Image
        source={item.images ? { uri: item.images[0].url } : require('../assets/images/placeholder.jpg')}
        style={styles.attractionImage}
        accessibilityLabel="Attraction image."
      />
      <Text style={styles.attractionName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchButtonContainer}>
        <View style={{ flex: 2 }}>
          <View style={styles.searchContainer}>
            <Image source={require('../assets/images/search_icon.png')}
              style={styles.searchIcon}
              accessibilityElementsHidden={true} />
            <TextInput
              style={styles.input}
              placeholder="Search for attractions"
              placeholderTextColor={"#000000"}
              onChangeText={handleChange}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleSearch}
            accessibilityLabel="Search for attraction with search term.">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
        </View>
      ) : (
        <View>
          {attractions.attractionData && attractions.attractionData._embedded?.attractions.length > 0 ? (
            <FlatList
              data={attractions.attractionData._embedded?.attractions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.attractionsContainer}
            />
            //Provide fallback in case there are no attractions that match your search term
          ) : (
            <View style={styles.placeholderContainer}>
              <Image source={require('../assets/images/404.png')} style={styles.placeholderImage} />
            </View>
          )}
        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ET_XLIGHT_BLUE,
    padding: 20,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  searchButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.ET_PRIMARY_BLUE,
    padding: 11,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 15
  },
  buttonText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ET_LIGHT_BLUE,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    height: 40,
    width: "100%"
  },
  attractionsContainer: {
    marginTop: 20,
    paddingBottom: 75
  },
  attractionContainer: {
    height: 75,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    marginBottom: 15
  },
  attractionImage: {
    width: 150,
    height: 75,
    marginRight: 10,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: "left",
    flexShrink: 1
  },
  placeholderImage: {
    alignSelf: "center",
    marginTop: 60
  }
});

export default HomePage;
