/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { WheelPicker } from "./lib"

const itemSize = 40
const styles = StyleSheet.create({
  item: {
    height: itemSize,
    borderWidth: 1,
    borderColor: 'green',
    textAlign: 'center'
  },
  upperSeparator: {
    position: 'absolute',
    height: 5,
    backgroundColor: 'purple',
    top: itemSize * 5,
    left: itemSize,
    right: itemSize
  },
  lowerSeparator: {
    position: 'absolute',
    height: 5,
    backgroundColor: 'purple',
    left: 40,
    right: 40,
    top: (itemSize * 5) + itemSize,
  }
})
const countItem = 12
const DATA = [...Array(countItem).keys()].map((index) => `P${index}`)
const App = () => {
  const [index, setIndex] = useState(0)

  const onChangeIndex = useCallback((index) => {
    if (isNaN(index)) {
      setIndex(0)
    }
    else {
      setIndex(index)
    }
  })

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TextInput style={{ borderWidth: 1, margin: 20 }} value={index ? index.toString() : ''} onChangeText={(index) => onChangeIndex(parseInt(index))} />
      <View style={{ borderWidth: 1 }}>
        <WheelPicker itemHeight={40} countVisibleItems={5}
          onSelected={onChangeIndex}
          selectedIndex={index}
          items={DATA}
          backgroundColor={'#ECEFF0'} />
      </View>
    </View>
  )

}

export default App;
