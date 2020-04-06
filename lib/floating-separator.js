import React from 'react'
import { View, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
    }
})

export default function FloatingSeparator({
    height,
    position,
    backgroundColor,
    marginHorizontal }) {
    const separatorStyle = {
        height,
        backgroundColor,
        top: position,
        left: marginHorizontal,
        right: marginHorizontal
    }
    return <View testID={'floatingSeparatorView'} style={[styles.absolute, separatorStyle]}></View>
}