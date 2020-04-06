import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    defaultTextItem: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})


export default function ({ onPress, backgroundColor, isSelected, content, height, textStyle,
    selectedTextStyle,
    unselectedTextStyle
}) {

    const selectedStateStyle = isSelected ? selectedTextStyle : unselectedTextStyle
    return (
        <TouchableOpacity testID={'container-item'} style={{ height, backgroundColor, justifyContent: 'center' }} onPress={onPress}>
            <Text testID={'text-item'} style={[styles.defaultTextItem, textStyle, selectedStateStyle]}>{content}</Text>
        </TouchableOpacity>
    )
}
