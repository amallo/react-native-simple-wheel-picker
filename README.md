# React Native Simple Wheel Picker

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

A cross-platform wheel picker component for React Native in pure Javascript.

- Checkout the [example/](https://github.com/amallo/react-native-simple-wheel-picker/tree/master/examples/SimplePickerExample) folder for source code.

## Demo

<img src="https://github.com/amallo/react-native-simple-wheel-picker/blob/master/demo.gif" width="360" />

## Installation

Open a Terminal in the project root and run:

```sh
npm install react-native-simple-wheel-picker
```

We're done! Now you can build and run the app on your device/simulator.

## Quick Start

```js
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
  const [countItem] = useState(12)
  const [countVisibleItems] = useState(5)
  const [itemHeight] = useState(40)

  const [onChangeIndex] = useOnChangeNumber(setIndex)

  const items = [...Array(countItem).keys()].map((index) => `This is item ${index}`)

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>

        <View>
          <Text>{`Selected index (${items[index]})`}</Text>
          <TextInput style={styles.input} keyboardType={'numeric'} placeholder={'Selected index'} value={'' + index || ''} onChangeText={onChangeIndex} />
        </View>
      </ScrollView>
      <WheelPicker
        itemHeight={itemHeight <= 0 ? undefined : itemHeight}
        countVisibleItems={countVisibleItems < 2 ? 2 : countVisibleItems}
        onSelected={onChangeIndex}
        selectedIndex={index}
        items={items}
        backgroundColor={'#ECEFF0'} />
    </View>
  )
}
export default App;

```

[Try this example on Snack](https://snack.expo.io/@satya164/react-native-tab-view-quick-start)



## API reference

The package exports a `WheelPicker` component which is the one you'd use to render the wheel picker view.

### `WheelPicker`

Container component responsible for rendering and managing tabs. Follows material design styles by default.

Basic usage look like this:

```js
<WheelPicker
  onSelected={setIndex}
  selectedIndex={index}
  items={items}
/>
```

#### Props

##### onSelected (`required`)

Callback which is called on wheel picker change, receives the index of the new selected item as argument.
The current selected index state needs to be updated when it's called, otherwise the change is dropped.

##### selectedIndex (`required`)


This is the current selected index that needs to be updated when the picker change. You can use this property to update the selected item.

##### itemHeight (`optional`)

Height of each item of the picker needs to be upper to zero. The global height of the container depends on the height of each item. 

```js
<WheelPicker
  onSelected={setIndex}
  selectedIndex={index}
  itemHeight={30}
/>
```

##### countVisibleItems (`optional`)

The minimum number of visible items to be displayed. The global height of the container depends on the number of visible items. Default value is `2`

```js
<WheelPicker
  onSelected={setIndex}
  selectedIndex={index}
  countVisibleItems={6}
/>
```

##### items (`optional`)

An array of string items that needs to be displayed. Default value is `[]`. This array can be updated any time, the picker will refresh its content according to the new array.

```js
<WheelPicker
  onSelected={setIndex}
  selectedIndex={index}
  items={["A", "B", "C"]}
/>
```

You need to extract the corresponding value using the `selectedIndex` property.

## Contributing

While developing, you can run the example app to test your changes.

Make sure your code passes unit tests. Run the following to verify:

```sh
npm run test
```

Remember to add tests for your change.

<!-- badges -->

[version-badge]: https://img.shields.io/npm/v/react-native-simple-wheel-picker.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-simple-wheel-picker
[license-badge]: https://img.shields.io/npm/l/react-native-simple-wheel-picker.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT