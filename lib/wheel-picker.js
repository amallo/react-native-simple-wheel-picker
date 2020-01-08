import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const itemSize = 40;
const styles = StyleSheet.create({
  item: {
    height: itemSize,
    borderWidth: 1,
    borderColor: 'green',
    textAlign: 'center',
  },
  upperSeparator: {
    position: 'absolute',
    height: 5,
    backgroundColor: 'purple',
    top: itemSize * 5,
    left: itemSize,
    right: itemSize,
  },
  lowerSeparator: {
    position: 'absolute',
    height: 5,
    backgroundColor: 'purple',
    left: 40,
    right: 40,
    top: itemSize * 5 + itemSize,
  },
});
export default class WheelPicker extends Component {
  render() {
    return (
      <View style={{ height: 400 }}>
        <View style={styles.upperSeparator} />
        <View style={styles.lowerSeparator} />
        <ScrollView
          decelerationRate={0.999}
          snapToInterval={itemSize}
          contentContainerStyle={{
            borderColor: 'red',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />

          <Text style={styles.item}>Choose</Text>
          <Text style={styles.item}>Portugal</Text>
          <Text style={styles.item}>England</Text>
          <Text style={styles.item}>Portugal</Text>
          <Text style={styles.item}>England</Text>
          <Text style={styles.item}>Portugal</Text>
          <Text style={styles.item}>England</Text>
          <Text style={styles.item}>Portugal</Text>
          <Text style={styles.item}>England</Text>
          <Text style={styles.item}>England</Text>

          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
        </ScrollView>
      </View>
    );
  }
}
