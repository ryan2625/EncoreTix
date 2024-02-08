import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native'
import AttractionPage from "../Encore-Tix-Code/components/AttractionPage"
import HomePage from "../Encore-Tix-Code/components/HomePage"
import { COLORS } from "../Encore-Tix-Code/assets/theme"
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