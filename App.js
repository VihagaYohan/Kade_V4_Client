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
import {useSelector, Provider} from 'react-redux';

// screens
import ShopScreen from './app/screens/ShopScreen';
import MapScreen from './app/screens/MapScreen';

// redux
import configureStore from './app/store/store';
import store from './app/store/store';

// navigators
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import {useEffect} from 'react';

import API from './app/api/categories';

const App = () => {
  return <MapScreen />;

  {
    /*return (
    
     <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider> 
  );*/
  }
};

export default App;
