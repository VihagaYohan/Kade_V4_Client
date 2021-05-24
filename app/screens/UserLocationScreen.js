import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Overlay,
} from 'react-native-maps';

// components
import {
  Container,
  Loading,
  HelperText,
  AppText,
  AppTextInput,
  Icon,
  AppButton,
} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const {width, height} = SIZES; // device width and height

const UserLocationScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState('');

  // get user's current localtion
  const getPermission = async () => {
    setLoading(true);
    try {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setLoading(false);
        return alert('Kad needs to grant access to detect location');
      }

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync();
      setLocation({latitude, longitude});
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getPermission();
  }, []);

  // get address from AppText component
  const getAddress = address => {
    setAddress(address);
  };

  if (loading) return <Loading />;

  if (location == null) return <Loading />;

  return (
    <Container style={styles.container}>
      {/* map view container */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <Callout tooltip={false} style={styles.callOut}>
              <AppText style={styles.callOutText}>You are here :)</AppText>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.backIconContainer}>
          <Icon
            name="arrow-left"
            size={normalizeSize(20)}
            color={COLORS.secondary}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <AppButton
        title="Proceed"
        style={styles.proceedButton}
        onPress={() => alert('hello')}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  mapContainer: {
    height: '70%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  callOut: {
    width: normalizeSize(100),
    height: normalizeSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  callOutText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(12),
  },
  backIconContainer: {
    width: normalizeSize(40),
    height: normalizeSize(40),
    borderRadius: normalizeSize(20),
    backgroundColor: COLORS.gray1,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // address text input styles
  addressField: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
    color: 'black',
  },

  // proceed button
  proceedButton: {
    width: width - normalizeSize(20),
    marginTop: normalizeSize(20),
  },
});

export default UserLocationScreen;
