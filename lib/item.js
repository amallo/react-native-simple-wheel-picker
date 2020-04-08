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
    const touchableAccessibilityLabel = `picker_item:` + content
    const selectedStateStyle = isSelected ? selectedTextStyle : unselectedTextStyle
    return (
        <TouchableOpacity accessibilityLabel={touchableAccessibilityLabel} testID={'container-item'} style={{ height, backgroundColor, justifyContent: 'center' }} onPress={onPress}>
            <Text testID={'text-item'} style={[styles.defaultTextItem, textStyle, selectedStateStyle]}>{content}</Text>
        </TouchableOpacity>
    )
}
