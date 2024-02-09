import React from 'react';
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AttractionPage from "../Encore-Tix-Code/components/AttractionPage"
import HomePage from "../Encore-Tix-Code/components/HomePage"
import { COLORS } from "../Encore-Tix-Code/assets/theme"

/**
 * Author: Ryan Freas
 * Date: 2/9/2024
 * Description: EncoreTix was created using React Native, with a managed workflow. It calls the Ticketmaster Discovery API 
 * to dynamically retrieve attractions based on the user's search term. Each attraction can be clicked to navigate to 
 * see more details of the attraction, as well as links of upcoming events at the attraction.
 * 
 * This component defines the navigation and routes of the app. 
 */

function App() {

    const Stack = createStackNavigator();

    function LogoTitle() {
        return (
            <Image
                source={require('../Encore-Tix-Code/assets/images/ET_logo_small.png')}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.ET_BLACK,
                    },
                    headerTitle: LogoTitle
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomePage} />
                <Stack.Screen
                    name="Attraction"
                    component={AttractionPage}
                    options={{ headerBackVisible: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App