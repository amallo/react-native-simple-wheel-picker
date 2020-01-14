import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const itemSize = 40;
const countItem = 100;
const visibleItem = 4;
const marginHorizontal = 20
const visibleHeight = visibleItem * itemSize;
const separatorSize = 1

const DATA = [...Array(countItem).keys()].map((index) => `P${index}`)

const styles = StyleSheet.create({
  item: {
    height: itemSize,
    borderColor: 'green',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  upperSeparator: {
    position: 'absolute',
    height: separatorSize,
    backgroundColor: '#4DB6AC',
    left: marginHorizontal,
    right: marginHorizontal,
  },
  lowerSeparator: {
    position: 'absolute',
    height: separatorSize,
    backgroundColor: '#4DB6AC',
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
  constructor(props) {
    super(props)
    const pos = getSeparatorPosition(visibleItem, visibleHeight, itemSize)
    const { upperSeparatorPosition, lowerSeparatorPosition } = pos
    const separatorStartIndex = Math.trunc(upperSeparatorPosition / itemSize)
    const separatorEndIndex = separatorStartIndex + 1
    const topSpaceItem = visibleItem - separatorEndIndex
    const bottomSpaceItem = separatorStartIndex
    this.state = {
      upperSeparatorPosition,
      lowerSeparatorPosition,
      topSpaceItem,
      bottomSpaceItem
    }

  }
  renderItem = (value, index) => {
    return <Text key={`visible${index}`} style={styles.item}>{value}</Text>
  }
  render() {
    const { upperSeparatorPosition, lowerSeparatorPosition, topSpaceItem, bottomSpaceItem } = this.state
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ height: visibleHeight, backgroundColor: '#ECEFF0' }}>

          <View style={[styles.upperSeparator, { top: upperSeparatorPosition }]} />
          <View style={[styles.lowerSeparator, { top: lowerSeparatorPosition }]} />
          <ScrollView
            decelerationRate={"normal"}
            snapToStart={false}
            snapToInterval={itemSize}
          >
            {
              [...Array(bottomSpaceItem).keys()].map((index) => {
                return <View key={`bottom${index}`} style={styles.item} />
              })
            }
            {
              DATA.map(this.renderItem)
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
