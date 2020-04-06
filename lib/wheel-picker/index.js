import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FloatingSeparator from "../floating-separator"
import Item from "../item"

/**
 * A group of default values to simplify the use of the picker
 */
export const defaultSeparatorBackgroundColor = '#4DB6AC'
export const defaultMarginHorizontal = 20
export const defaultItemHeight = 40
export const defaultCountVisibleItems = 5
export const defaultSeparatorHeight = 1
export const defaultSelectedTextStyle = { fontWeight: 'bold', color: '#37474F' }
export const defaultUnselectedTextStyle = { fontWeight: 'normal', color: '#ADADAD' }


const styles = StyleSheet.create({
  defaultTextItem: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  defaultSeparator: {
    position: 'absolute',
  }
})

/**
 * A scroller is an empty component that enable to activate scroll
 */
export const Scroller = ({ height }) => {
  return <View style={{ height }} testID={'scrollerView'} />
}
/**
 * Define a unique key for each scroll child
 * @param {*} ComponentClass The component we want to render
 * @param {*} keyPrefix The key prefix that will be combined with index of rendered the scroll child
 */
const mapScrollChild = (ComponentClass, keyPrefix) => (props) => (index) => <ComponentClass key={`${keyPrefix}${index}`} testID={keyPrefix} {...props} />
const defaultRenderTopSpaceScroller = mapScrollChild(Scroller, 'topScroller')
const defaultRenderBottomSpaceScroller = mapScrollChild(Scroller, 'bottomScroller')
const defaultRenderVisibleItemAtIndex = mapScrollChild(Item, 'item')


const getSeparatorPosition = (countVisibleItems, height, itemHeight) => {
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
  backgroundColor,
  itemTextStyle,
  selectedItemTextStyle = defaultSelectedTextStyle,
  unselectedItemTextStyle = defaultUnselectedTextStyle,
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
  const [scrollPosition, setScrollPosition] = useState(selectedIndex * itemHeight)
  const [isStartDragingScroll, setIsStartDragingScroll] = useState(false)

  let scrollViewRef = useRef(null);


  useEffect(() => {
    if (!isStartDragingScroll) {
      const position = selectedIndex * itemHeight
      scrollViewRef.current.scrollTo({ x: 0, y: position, animated: true })
    }
  }, [selectedIndex, isStartDragingScroll])

  const doScroll = useCallback(({ nativeEvent }) => {
    const position = nativeEvent.contentOffset.y
    setScrollPosition(position)
  }, [itemHeight])

  const doStartDragScroll = useCallback(() => {
    setIsStartDragingScroll(true)
  })

  const doEndDragScroll = useCallback(() => {
    const index = Math.round(scrollPosition / itemHeight)
    onSelected(index)
    setIsStartDragingScroll(false)
  }, [itemHeight, scrollPosition])


  return (
    <View style={{ height, backgroundColor }} testID={'container'}>
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
        onScrollBeginDrag={doStartDragScroll}
        onScrollEndDrag={doEndDragScroll}
        onScroll={doScroll}
        decelerationRate={"fast"}>
        {
          [...Array(countTopScrollers).keys()].map(renderTopSpaceScroller({ height: itemHeight }))
        }
        {
          items.map((content, index) => renderVisibleItemAtIndex({
            onPress: () => onSelected(index),
            isSelected: index === selectedIndex,
            height: itemHeight,
            content,
            textStyle: itemTextStyle,
            selectedTextStyle: selectedItemTextStyle,
            unselectedTextStyle: unselectedItemTextStyle
          })(index))
        }
        {
          [...Array(countBottomScrollers).keys()].map(renderBottomSpaceScroller({ height: itemHeight }))
        }
      </ScrollView>
    </View>
  );
}
