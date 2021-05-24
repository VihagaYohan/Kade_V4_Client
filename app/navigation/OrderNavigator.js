import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from '../screens/CartScreen';
import UserLocationScreen from '../screens/UserLocationScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="UserLocation"
        component={UserLocationScreen}
      />
      <Stack.Screen
        options={({route}) => ({headerShown: false})}
        name="OrderScreen"
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
