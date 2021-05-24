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
import PermissionScreen from './app/screens/Permission';
import UserLocation from './app/screens/UserLocationScreen';

// redux
import configureStore from './app/store/store';
import store from './app/store/store';

// navigators
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import HomeNavigator from './app/navigation/HomeNavigator';

import API from './app/api/categories';

const App = () => {
  /* return <UserLocation />; */
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RenderNavigator />
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAsyncStorage = async () => {
    try {
      const valud = await AsyncStorage.getItem('@token');
      if (!value) return;

      const token = JSON.parse(value);
      setLoginToken(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    checkAsyncStorage();
  }, []);

  if (loginToken == null) {
    return <AuthNavigator />;
  } else {
    checkAsyncStorage();

    if (loginToken == false) {
      return <AuthNavigator />;
    } else {
      <HomeNavigator />;
    }
  }
};

export default App;
