import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// constants
import {SIZES} from '../constants/';

const {width, height} = SIZES;

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{width: width, height: height}}
        region={{
          latitude: 6.9518,
          longitude: 79.9133,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
