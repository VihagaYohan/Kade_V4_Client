import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import ProductCategoryScreen from '../screens/ProductCategoryScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ShopListScreen from '../screens/ShopListScreen';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProductCategoryScreen"
        component={ProductCategoryScreen}
      />
      <Stack.Screen
        options={({route}) => ({title: route.params.name, headerShown: true})}
        name="ProductListingScreen"
        component={ProductListingScreen}
      />
      <Stack.Screen name="ShopListScreen" component={ShopListScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
