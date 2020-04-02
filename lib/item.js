import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    defaultTextItem: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default function ({ onPress, backgroundColor, isSelected, content, height }) {
    const selectedStateStyle = isSelected ? { fontWeight: 'bold', color: '#37474F' } : { fontWeight: 'normal', color: '#ADADAD' }
    return (
        <TouchableOpacity testID={'container-item'} style={{ height, backgroundColor, justifyContent: 'center' }} onPress={onPress}>
            <Text testID={'text-item'} style={[styles.defaultTextItem, selectedStateStyle]}>{content}</Text>
        </TouchableOpacity>
    )
}
