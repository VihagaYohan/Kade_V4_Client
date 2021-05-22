import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {addValue, decreaseValue, addItemToCart} from '../store/actions/actions';
//import store from '../store/store';

const Redux = () => {
  const data = useSelector(state => state);
  console.log(data);
  console.log(data.cart);

  const dispatch = useDispatch();
  console.log(`Current state `);
  //console.log(store.getState().cart);
  return (
    <View style={styles.container}>
      <Button title="Increment" onPress={() => dispatch(addValue(3))} />
      {/* <Text>{data.count}</Text> */}
      <Button title="Decrement" onPress={() => dispatch(decreaseValue(2))} />
      <Button
        title="Add Item"
        onPress={() => dispatch(addItemToCart({id: 2, name: 'Samsung s10'}))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Redux;
