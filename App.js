/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import BorrowerScreen from './src/BorrowerScreen';
import HomeScreen from './src/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const StackNavigator = createStackNavigator();

const App = () => {
  return (
    // <BorrowerScreen/>
    // <HomeScreen/>
    <NavigationContainer>
      <StackNavigator.Navigator>
          <StackNavigator.Screen name="HomeScreen" component={HomeScreen}  />
          <StackNavigator.Screen name="BorrowerScreen" component={BorrowerScreen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};



export default App;
