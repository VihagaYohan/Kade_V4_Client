import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import AppNavigator from './AppNavigator';
import OrderScreen from '../screens//Profile/UserAccountScreen';
import CartScreen from '../screens/CartScreen';

// components
import {Icon, AppText,CustomTabBarButton} from '../components';

// constants
import {normalizeSize, COLORS, SIZES} from '../constants';
import {greaterThan} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();



const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          //bottom: normalizeSize(20),
          backgroundColor: COLORS.white,
          //height: normalizeSize(90),
          paddingBottom: normalizeSize(10),
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name="home"
                size={normalizeSize(20)}
                color={focused ? COLORS.primary : COLORS.gray}
              />
              <AppText
                style={[
                  styles.tabName,
                  {color: focused ? COLORS.primary : COLORS.gray},
                ]}>
                Home
              </AppText>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={normalizeSize(30)}
              color={COLORS.white}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name="user"
                size={normalizeSize(20)}
                color={focused ? COLORS.primary : COLORS.gray}
              />
              <AppText
                style={[
                  styles.tabName,
                  {color: focused ? COLORS.primary : COLORS.gray},
                ]}>
                Profile
              </AppText>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    // shadow properties for iOS
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: normalizeSize(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    // shadow properties for android
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  tabName: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
  },
});

export default BottomTabNavigator;
