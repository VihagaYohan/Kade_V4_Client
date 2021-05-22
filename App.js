/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';

// screens

// navigators
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import {useEffect} from 'react';

import API from './app/api/categories'

const App = () => {
/*   const getMoviesFromApi = async () => {
    const response = await API.getAllCategories()
    const data = response.data

    console.log(data)
  };
  useEffect(() => {
    getMoviesFromApi()
  }, []);
  return <Text>hello</Text>; */

  return (
     <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer> 
  );
};

export default App;
