import React, {Component, useState, useRef} from 'react';
import {StyleSheet, View, Image, Animated, FlatList, Text} from 'react-native';

// constants
import {SIZES, normalizeSize} from '../constants';

const {width, height} = SIZES; // screen height and width

// carousel items
const carouselItems = [
  {
    id: 1,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item1.png',
  },
  {
    id: 2,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item2.png',
  },
  {
    id: 3,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item3.png',
  },
];

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current; // to store current scroll position


  const CarouselItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const outputRange = [0.5, 1, 0.5];

    const itemStyle = scrollX.interpolate({
      inputRange,
      outputRange,
    });

    return (
      <Animated.View
        style={[styles.cardContainer, {transform: [{scale: itemStyle}]}]}>
        <Animated.Image
          style={{width: '100%', height: '100%'}}
          source={{uri: item.url}}
          resizeMode="cover"
        />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={carouselItems}
      keyExtractor={i => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      renderItem={CarouselItem}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SIZES.width - normalizeSize(20),
    height: SIZES.width / 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Carousel;
