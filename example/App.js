/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const itemSize = 40;
const countItem = 10;
const visibleItem = 10;
const marginHorizontal = 40
const visibleHeight = visibleItem * itemSize;
const separatorSize = 5

const DATA = [...Array(countItem).keys()].map((index) => `P${index}`)

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: itemSize,
    borderWidth: 1,
    borderColor: 'green',
    textAlign: 'center'
  },
  upperSeparator: {
    position: 'absolute',
    height: separatorSize,
    backgroundColor: 'purple',
    left: marginHorizontal,
    right: marginHorizontal,
  },
  lowerSeparator: {
    position: 'absolute',
    height: separatorSize,
    backgroundColor: 'purple',
    left: marginHorizontal,
    right: marginHorizontal,
  },
});

const getSeparatorPosition = (visibleItem, visibleHeight, itemSize) => {
  if (visibleItem % 2 === 0) {
    const upperSeparatorPosition = (visibleHeight / 2)
    const lowerSeparatorPosition = upperSeparatorPosition + itemSize
    return {
      upperSeparatorPosition,
      lowerSeparatorPosition
    }
  }
  else {
    const lowerSeparatorPosition = ((visibleHeight + itemSize) / 2)
    const upperSeparatorPosition = lowerSeparatorPosition - itemSize
    return {
      upperSeparatorPosition,
      lowerSeparatorPosition
    }
  }
}

class App extends Component {
  render() {
    const pos = getSeparatorPosition(visibleItem, visibleHeight, itemSize)
    const separatorStartIndex = Math.trunc(pos.upperSeparatorPosition / itemSize)
    const separatorEndIndex = separatorStartIndex + 1
    const topSpaceItem = visibleItem - separatorEndIndex
    const bottomSpaceItem = separatorStartIndex
    console.log('visible', DATA.slice(0, visibleItem))
    console.log('hidden', DATA.slice(visibleItem))
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ height: visibleHeight }}>
          <View style={[styles.upperSeparator, { top: pos.upperSeparatorPosition }]} />
          <View style={[styles.lowerSeparator, { top: pos.lowerSeparatorPosition }]} />
          <ScrollView
            decelerationRate={0.999}
            snapToInterval={itemSize}
            contentContainerStyle={{
              borderColor: 'red',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              [...Array(bottomSpaceItem).keys()].map((index) => {
                return <View key={`bottom${index}`} style={styles.item} />
              })
            }

            {
              DATA.slice(0, visibleItem).map((value, index) => {
                return <Text key={`visible${index}`} style={styles.item}>{value}</Text>
              })
            }
            {
              DATA.slice(visibleItem).map((value, index) => {
                return <Text key={`hidden${index}`} style={styles.item}>{value}</Text>
              })
            }
            {
              [...Array(topSpaceItem).keys()].map((index) => {
                return <View key={`top${index}`} style={styles.item} />
              })
            }

          </ScrollView>
        </View>
      </View >
    );
  }
}

export default App;
