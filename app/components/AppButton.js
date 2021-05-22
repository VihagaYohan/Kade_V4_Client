import React, { Component } from 'react'
import {StyleSheet,View,TouchableOpacity} from 'react-native'

// components
import {AppText,Icon} from './index'

// constants
import {SIZES,COLORS} from '../constants'

const AppButton = ({styles,onPress,children,icon})=>{
    return(
        <TouchableOpacity style={[styles.container]}>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        
    }
})

export default AppButton;