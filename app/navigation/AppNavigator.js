import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import ProductCategoryScreen from '../screens/ProductCategoryScreen';
import ProductListingScreen from '../screens/ProductListingScreen';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProductCategoryScreen"
        component={ProductCategoryScreen}
      />
      <Stack.Screen
        name="ProductListingScreen"
        component={ProductListingScreen}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
