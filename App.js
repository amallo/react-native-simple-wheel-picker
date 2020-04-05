

import React, { useState, useCallback } from 'react';
import { TextInput, View, Text, ScrollView } from 'react-native';
import { WheelPicker } from "./lib"

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


const App = () => {

  const [index, setIndex] = useState(0)
  const [countItem, setCountItem] = useState(12)
  const [countVisibleItems, setCountVisibleItems] = useState(5)
  const [itemHeight, setItemHeight] = useState(40)

  const [onChangeIndex] = useOnChangeNumber(setIndex)
  const [onChangeGenerateData] = useOnChangeNumber(setCountItem)
  const [onChangeCountVisibleItems] = useOnChangeNumber(setCountVisibleItems)
  const [onChangeItemHeight] = useOnChangeNumber(setItemHeight)

  const items = [...Array(countItem).keys()].map((index) => `P${index}`)

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <ScrollView>
        <View>
          <Text>Height of each item</Text>
          <TextInput style={{ borderWidth: 1, margin: 20 }} keyboardType={'numeric'} placeholder={'Visible items'} value={itemHeight ? itemHeight.toString() : ''} onChangeText={onChangeItemHeight} />
        </View>
        <View>
          <Text>Number Visible items (min: 2)</Text>
          <TextInput style={{ borderWidth: 1, margin: 20 }} keyboardType={'numeric'} placeholder={'Visible items'} value={countVisibleItems ? countVisibleItems.toString() : ''} onChangeText={onChangeCountVisibleItems} />
        </View>
        <View>
          <Text>Generate data</Text>
          <TextInput style={{ borderWidth: 1, margin: 20 }} keyboardType={'numeric'} placeholder={'Generate data'} value={countItem ? countItem.toString() : ''} onChangeText={onChangeGenerateData} />
        </View>
        <View>
          <Text>Selected index</Text>
          <TextInput style={{ borderWidth: 1, margin: 20 }} keyboardType={'numeric'} placeholder={'Selected index'} value={index ? index.toString() : ''} onChangeText={onChangeIndex} />
        </View>
      </ScrollView>
      <View style={{ borderWidth: 1 }}>
        <WheelPicker itemHeight={itemHeight < 1 ? undefined : itemHeight}
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
