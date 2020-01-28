import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FloatingSeparator from "./floating-separator"
import Item from "./item"

/**
 * A group of default values to simplify the use of the picker
 */
export const defaultSeparatorBackgroundColor = '#4DB6AC'
export const defaultMarginHorizontal = 20
export const defaultItemHeight = 40
export const defaultCountVisibleItems = 5
export const defaultSeparatorHeight = 1

const styles = StyleSheet.create({
  defaultTextItem: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  defaultSeparator: {
    position: 'absolute',
  }
})

export const Scroller = ({ height, }) => {
  return <View style={{ height }} testID={'scrollerView'} />
}
/*
export const Item = ({ onPress, isSelected, content, height, style = styles.defaultTextItem }) => {
  const selectedStateStyle = isSelected ? { fontWeight: 'bold' } : { fontWeight: 'normal' }
  return (
    <TouchableOpacity style={{ height, borderTopWidth: 1 }} onPress={onPress}>
      <Text style={[style, selectedStateStyle]}>{content}</Text>
    </TouchableOpacity>
  )
}*/



const mapScrollChild = (ComponentClass, keyPrefix) => (props) => (index) => <ComponentClass key={`${keyPrefix}${index}`} testID={keyPrefix} {...props} />
const defaultRenderTopSpaceScroller = mapScrollChild(Scroller, 'topScroller')
const defaultRenderBottomSpaceScroller = mapScrollChild(Scroller, 'bottomScroller')
const defaultRenderVisibleItemAtIndex = mapScrollChild(Item, 'item')


export const getSeparatorPosition = (countVisibleItems, height, itemHeight) => {
  const hasEvenVisibleItems = countVisibleItems % 2 === 0
  const topSeparatorPosition = hasEvenVisibleItems ? height / 2 : (height + itemHeight) / 2
  return topSeparatorPosition
}
const getVisibleHeight = (itemHeight, countVisibleItems) => itemHeight * countVisibleItems

/**
 *  
 */
export const WheelPicker = ({
  onSelected = () => { },
  renderTopSpaceScroller = defaultRenderTopSpaceScroller,
  renderBottomSpaceScroller = defaultRenderBottomSpaceScroller,
  renderVisibleItemAtIndex = defaultRenderVisibleItemAtIndex,
  itemHeight = defaultItemHeight,
  countVisibleItems = defaultCountVisibleItems,
  items = [],
  selectedIndex = 0,
  separatorBackgroundColor = defaultSeparatorBackgroundColor,
  separatorMarginHorizontal = defaultMarginHorizontal,
  separatorHeight = defaultSeparatorHeight }) => {

  const height = getVisibleHeight(itemHeight, countVisibleItems)
  const separatorPosition = getSeparatorPosition(countVisibleItems, height, itemHeight)
  const countTopScrollers = Math.trunc(separatorPosition / itemHeight)
  const countBottomScrollers = countVisibleItems - (countTopScrollers + 1)
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)



  const scrollViewRef = useRef(null);

  const scrollToSelectedIndex = useCallback((index) => {
    const scrollPosition = index * itemHeight
    scrollViewRef.current.scrollTo({ x: 0, y: scrollPosition })
  }, [itemHeight])

  const setSelectedIndexFromScroll = useCallback(({ nativeEvent }) => {
    const scrollPosition = nativeEvent.contentOffset.y
    const index = Math.round(scrollPosition / itemHeight)
    setCurrentIndex(index)
  }, [itemHeight])

  useEffect(() => {
    onSelected(currentIndex)
  }, [currentIndex])


  return (
    <View style={{ height }} testID={'container'}>
      <FloatingSeparator
        testID={'topSeparator'}
        height={separatorHeight}
        position={separatorPosition}
        backgroundColor={separatorBackgroundColor}
        marginHorizontal={separatorMarginHorizontal} />
      <FloatingSeparator
        testID={'bottomSeparator'}
        style={styles.defaultSeparator}
        height={separatorHeight}
        position={separatorPosition + itemHeight}
        backgroundColor={separatorBackgroundColor}
        marginHorizontal={separatorMarginHorizontal} />
      <ScrollView
        ref={scrollViewRef}
        testID={'scrollView'}
        snapToInterval={itemHeight}
        snapToStart={false}
        onScroll={setSelectedIndexFromScroll}
        decelerationRate={"fast"}>
        {
          [...Array(countTopScrollers).keys()].map(renderTopSpaceScroller({ height: itemHeight }))
        }
        {
          items.map((content, index) => renderVisibleItemAtIndex({
            onPress: () => scrollToSelectedIndex(index),
            isSelected: index === currentIndex,
            height: itemHeight,
            content
          })(index))
        }
        {
          [...Array(countBottomScrollers).keys()].map(renderBottomSpaceScroller({ height: itemHeight }))
        }
      </ScrollView>
    </View>
  );
}
