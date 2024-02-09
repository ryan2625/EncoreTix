import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../assets/theme";

const HomePage = () => {
  const navigation = useNavigation();
  const [attractions, setAttractions] = useState({});
  const [searchTerm, setSearchTerm] = useState("Phish");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    handlePress();
  }, [clicked]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchTerm("Phish");
    }
    setClicked(!clicked);
  };

  async function handlePress() {
    try {
      const response = await fetch(`http://192.168.1.144:4000/api/attractions/${searchTerm}`);
      if (!response.ok) {
        throw new Error('404 Not Found');
      }
      const data = await response.json();
      setAttractions(data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  }

  function handleChange(text) {
    setSearchTerm(text);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Attraction', { attractionId: item.id })}
      style={styles.attractionContainer}
    >
      <Image
        source={item.images ? { uri: item.images[0].url } : require('../assets/images/placeholder.jpg')}
        style={styles.attractionImage}
      />
      <Text style={styles.attractionName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchButtonContainer}>
        <View style={{ flex: 2 }}>
          <View style={styles.searchContainer}>
            <Image source={require('../assets/images/search_icon.png')} style={styles.searchIcon} />
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
            onPress={handleSearch}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {attractions.attractionData && attractions.attractionData._embedded?.attractions.length > 0 ? (
        <FlatList
          data={attractions.attractionData._embedded?.attractions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.attractionsContainer}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Image source={require('../assets/images/404.png')} style={styles.placeholderImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ET_XLIGHT_BLUE,
    padding: 20,
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
    marginBottom: 15,
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
