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
import { Header } from 'react-native/Libraries/NewAppScreen';
import Capitalcontribution from './src/Capitalcontribution';

const StackNavigator = createStackNavigator();

const App = () => {
  return (
    // <BorrowerScreen/>
    // <HomeScreen/>
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{header:()=>null}}>
          <StackNavigator.Screen name="HomeScreen" component={HomeScreen}  />
          <StackNavigator.Screen name="BorrowerScreen" component={BorrowerScreen} />
          <StackNavigator.Screen name="Capitalcontribution" component={Capitalcontribution} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  
  );
};



export default App;
