import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import ProductCategoryScreen from '../screens/ProductCategoryScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ShopListScreen from '../screens/ShopListScreen';
import ShopScreen from '../screens/ShopScreen';

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
      <Stack.Screen
        options={({route}) => ({title: route.params.name, headerShown: false})}
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="ShopListScreen" component={ShopListScreen} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
