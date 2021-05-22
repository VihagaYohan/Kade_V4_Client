import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

// components
import {AppText} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const Quantity = ({style, quantity, getCount}) => {
  const [count, setCount] = useState('1');
  console.log(quantity); // for developer purpose

  return (
    <View style={styles.container}>
      {/* increase button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => increseCount(count)}>
        <AppText style={styles.buttonText}>+</AppText>
      </TouchableOpacity>

      <TextInput
        style={styles.count}
        value={count}
        onChangeText={text => changeText(text)}
        keyboardType="numeric"
        onPress={() => alert('hello')}
      />

      {/* decrease button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => decreaseCount(count)}>
        <AppText style={styles.buttonText}>-</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  button: {
    width: normalizeSize(20),
    height: normalizeSize(20),
    borderWidth: 1,
    borderRadius: normalizeSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: normalizeSize(20),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default Quantity;
