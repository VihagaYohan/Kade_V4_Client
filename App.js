/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import ShopScreen from './app/screens/ShopScreen';
import MapScreen from './app/screens/MapScreen';
import CartScreen from './app/screens/CartScreen';

// redux
import configureStore from './app/store/store';
import store from './app/store/store';

// navigators
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import HomeNavigator from './app/navigation/HomeNavigator';

import API from './app/api/categories';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </Provider>
  );
  /* return (
    <Provider store={store}>
      <NavigationContainer>
        <CartScreen />
      </NavigationContainer>
    </Provider>
  ); */

  /* return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );   */
};

const RenderNavigator = () => {
  const [loginToken, setLoginToken] = useState(false);

  const checkAsyncStorage = async () => {
    try {
      const valud = await AsyncStorage.getItem('@token');
      if (!value) return;

      const token = JSON.parse(value);
      setLoginToken(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };
};

export default App;
