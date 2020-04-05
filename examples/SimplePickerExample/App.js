

import React, { useState, useCallback } from 'react';
import { TextInput, View, Text, ScrollView, StyleSheet } from 'react-native';
import { WheelPicker } from "react-native-simple-wheel-picker"

const useOnChangeNumber = (setFn, minimum = 0) => {
  const onChangeNumber = useCallback((index) => {
    const result = parseInt(index)
    if (isNaN(result)) {
      setFn(minimum)
    }
    else {
      setFn(result)
    }
  })
  return [onChangeNumber]
}

const styles = StyleSheet.create({
  input: { margin: 20, backgroundColor: 'gray', color: '#ECEFF0', marginTop: 5 }
})


const App = () => {
  const [index, setIndex] = useState(0)
  const [countItem, setCountItem] = useState(12)
  const [countVisibleItems, setCountVisibleItems] = useState(5)
  const [itemHeight, setItemHeight] = useState(40)

  const [onChangeIndex] = useOnChangeNumber(setIndex)
  const [onChangeGenerateData] = useOnChangeNumber(setCountItem)
  const [onChangeCountVisibleItems] = useOnChangeNumber(setCountVisibleItems)
  const [onChangeItemHeight] = useOnChangeNumber(setItemHeight)

  const items = [...Array(countItem).keys()].map((index) => `This is item ${index}`)

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <Text>Height of each item</Text>
          <TextInput style={styles.input} keyboardType={'numeric'} placeholder={'Visible items'} value={'' + itemHeight || ''} onChangeText={onChangeItemHeight} />
        </View>
        <View>
          <Text>Number Visible items (min: 2)</Text>
          <TextInput style={styles.input} keyboardType={'numeric'} placeholder={'Visible items'} value={'' + countVisibleItems || ''} onChangeText={onChangeCountVisibleItems} />
        </View>
        <View>
          <Text>Generate data</Text>
          <TextInput style={styles.input} keyboardType={'numeric'} placeholder={'Generate data'} value={'' + countItem || ''} onChangeText={onChangeGenerateData} />
        </View>
        <View>
          <Text>{`Selected index (${items[index]})`}</Text>
          <TextInput style={styles.input} keyboardType={'numeric'} placeholder={'Selected index'} value={'' + index || ''} onChangeText={onChangeIndex} />
        </View>
      </ScrollView>
      <View style={{ borderWidth: 1 }}>
        <WheelPicker
          itemHeight={itemHeight <= 0 ? undefined : itemHeight}
          countVisibleItems={countVisibleItems < 2 ? 2 : countVisibleItems}
          onSelected={onChangeIndex}
          selectedIndex={index}
          items={items}
          backgroundColor={'#ECEFF0'} />
      </View>
    </View>
  )

}

export default App;
