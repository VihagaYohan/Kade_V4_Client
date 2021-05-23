import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

// constants
import {SIZES} from '../constants/';

const {width, height} = SIZES;

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{width: width, height: height * 0.5}}
        region={{
          latitude: 6.9518,
          longitude: 79.9133,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}>
        <Marker
          coordinate={{
            latitude: 6.9518,
            longitude: 79.9133,
          }}>
          <Callout
            tooltip={false}
            style={{
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>{`Kelaniya`}</Text>
          </Callout>
        </Marker>
      </MapView>
      <View
        style={{
          width: 30,
          height: 30,
          borderWidth: 1,
          position: 'absolute',
          top: 10,
          left: 10,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.5,
  },
});

export default MapScreen;
