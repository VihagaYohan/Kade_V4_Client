import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';
import {Permissions} from 'react-native-unimodules';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';

// components
import {
  Container,
  Loading,
  HelperText,
  AppText,
  AppTextInput,
} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const {width, height} = SIZES; // device width and height

const UserLocationScreen = ({navigation, route}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log(status);
      let location = await Location.getLastKnownPositionAsync();
      setLocation(location);

      console.log(location)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Container style={styles.container}>
      <AppText>User location screen</AppText>
      {/* <AppText>{lat}</AppText>
      <AppText>{log}</AppText> */}
    
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserLocationScreen;
