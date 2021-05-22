import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

// constants
import {COLORS} from '../../constants/index';

const IconComponent = ({
  name,
  size = 20,
  color = COLORS.black,
  style,
  onPress,
}) => {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={[style]}
      onPress={onPress}
    />
  );
};

export default IconComponent;
