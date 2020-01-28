/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
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

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ borderWidth: 1 }}>
          <WheelPicker itemHeight={40} countVisibleItems={10} items={DATA} />
        </View>
      </View>
    );
  }
}

export default App;
