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
import {StripeProvider} from '@stripe/stripe-react-native';

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
    <StripeProvider publishableKey="pk_test_51Iule3EHwMdMCEQY8bnkfR06hUdCabBYOS33DwSbeACbAO6baUHeGZ43YByINPW8fbuOsiu72ak6Tz5In5orNIfn00AqDCJuSF">
      <Provider store={store}>
        <NavigationContainer>
          <RenderNavigator />
        </NavigationContainer>
      </Provider>
    </StripeProvider>
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
  const data = useSelector(store => store.user);
  const [loginToken, setLoginToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(data);

  if (data.userLogged == true) {
    return <HomeNavigator />;
  } else {
    return <AuthNavigator />;
  }
};

export default App;
