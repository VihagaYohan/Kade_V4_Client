import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';

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
  const [loading, setLoading] = useState(false);

  return (
    <Container style={styles.container}>
      <AppText>Map screen</AppText>
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
