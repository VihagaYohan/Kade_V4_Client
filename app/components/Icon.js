import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// constants
import {COLORS} from '../constants/index';

const IconComponent = ({name, size = 20, color = COLORS.black, style}) => {
  return <Icon name={name} size={size} color={color} style={[style]} />;
};

export default IconComponent;
