import React from 'react'
import TestRenderer, { act } from 'react-test-renderer';
import { ScrollView } from 'react-native'
import {
  WheelPicker, Scroller,
  defaultItemHeight,
  defaultMarginHorizontal,
  defaultSeparatorBackgroundColor,
  defaultSeparatorHeight,
  defaultCountVisibleItems
} from '..';

import FloatingSeparator from "../../floating-separator"


// this is just a little hack to silence a warning that we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
it('renders snapshot', () => {
  const wrapper = TestRenderer.create(<WheelPicker />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

it('calculates a container height depending on how many items visible', () => {
  const countVisibleItems = 10
  let wrapper = TestRenderer.create(<WheelPicker countVisibleItems={countVisibleItems} />);

  const container = wrapper.root.findByProps({ testID: 'container' })
  expect(container.props.style.height).toBe(countVisibleItems * defaultItemHeight)
})

it('calculates a container height depending on each item height', () => {
  const itemHeight = 32
  let wrapper = TestRenderer.create(<WheelPicker itemHeight={itemHeight} />);

  const container = wrapper.root.findByProps({ testID: 'container' })
  expect(container.props.style.height).toBe(defaultCountVisibleItems * itemHeight)
})

it('calculates a default container height', () => {
  let wrapper = TestRenderer.create(<WheelPicker />);

  const container = wrapper.root.findByProps({ testID: 'container' })
  expect(container.props.style.height).toBe(defaultCountVisibleItems * defaultItemHeight)
})

it('renders a list of items', () => {
  const countItems = 10
  const data = [...Array(countItems).keys()]
  const wrapper = TestRenderer.create(<WheelPicker items={data} />);

  const items = wrapper.root.findAllByProps({ testID: 'item' })
  expect(items.length).toBe(countItems)
});

it('renders a default empty list of items', () => {
  const wrapper = TestRenderer.create(<WheelPicker />);

  const items = wrapper.root.findAllByProps({ testID: 'item' })
  expect(items.length).toBe(0)
});


describe('separators', () => {
  it('renders separators with fixed height', () => {
    const wrapper = TestRenderer.create(<WheelPicker separatorHeight={5} />);
    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.height).toBe(5))
  })

  it('renders separators with a default height', () => {
    const wrapper = TestRenderer.create(<WheelPicker />);
    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.height).toBe(defaultSeparatorHeight))
  })

  it('renders separators with a default background color', () => {
    const wrapper = TestRenderer.create(<WheelPicker />);

    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.backgroundColor).toBe(defaultSeparatorBackgroundColor))
  })

  it('renders separators with a custom background color', () => {
    const wrapper = TestRenderer.create(<WheelPicker separatorBackgroundColor={'red'} />);

    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.backgroundColor).toBe('red'))
  })

  it('renders a separator with a default horizontal margin', () => {
    const wrapper = TestRenderer.create(<WheelPicker />);

    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.marginHorizontal).toBe(defaultMarginHorizontal))
  })

  it('renders a separator with a custom horizontal margin', () => {
    const wrapper = TestRenderer.create(<WheelPicker separatorMarginHorizontal={31} />);

    const separators = wrapper.root.findAllByType(FloatingSeparator)
    expect.assertions(2);
    separators.forEach((separator) => expect(separator.props.marginHorizontal).toBe(31))
  })

  it('renders separators vertically spaced by item height', () => {
    const wrapper = TestRenderer.create(<WheelPicker />);
    const topSeparator = wrapper.root.findByProps({ testID: 'topSeparator' })
    const bottomSeparator = wrapper.root.findByProps({ testID: 'bottomSeparator' })
    expect(bottomSeparator.props.position - topSeparator.props.position).toBe(defaultItemHeight)
  })

  it('renders top separator into the middle of container for an even number of items', () => {
    const countEventVisibleItems = 4
    const wrapper = TestRenderer.create(<WheelPicker countVisibleItems={countEventVisibleItems} />);

    const topSeparator = wrapper.root.findByProps({ testID: 'topSeparator' })
    const visibleHeight = defaultItemHeight * countEventVisibleItems
    expect(topSeparator.props.position).toBe(visibleHeight / 2)
  })

  it('renders top separator into the middle shift by item height for an odd number of items', () => {
    const countOddVisibleItems = 5
    const wrapper = TestRenderer.create(<WheelPicker countVisibleItems={countOddVisibleItems} />);

    const topSeparator = wrapper.root.findByProps({ testID: 'topSeparator' })
    const visibleHeight = defaultItemHeight * countOddVisibleItems
    expect(topSeparator.props.position).toBe((visibleHeight + defaultItemHeight) / 2)
  })
})

it('renders a snapped scrollview', () => {
  const wrapper = TestRenderer.create(<WheelPicker itemHeight={40} countVisibleItems={11} />);
  const { itemHeight } = wrapper.root.props

  const scrollView = wrapper.root.findByType(ScrollView)
  expect(scrollView.props.snapToInterval).toBe(itemHeight)
  expect(scrollView.props.snapToStart).toBe(false)
  expect(scrollView.props.decelerationRate).toBe("fast")
})


describe('scrollers', () => {
  it('renders a fixed height scroller', () => {
    const expectedHeight = 40
    const wrapper = TestRenderer.create(<Scroller height={expectedHeight} />);
    const scroller = wrapper.root.findByProps({ testID: 'scrollerView' })
    expect(scroller.props.style.height).toBe(expectedHeight)
  })

  it('renders top scrollers of fixed height', () => {
    const wrapper = TestRenderer.create(<WheelPicker itemHeight={40} countVisibleItems={4} />);
    const { itemHeight } = wrapper.root.props
    const topSeparatorPosition = wrapper.root.findByProps({ testID: 'topSeparator' }).props.position
    const topScrollers = wrapper.root.findAllByProps({ testID: 'topScroller' })
    topScrollers.forEach((scroller) => expect(scroller.props.height).toBe(itemHeight))

    const separatorStartIndex = Math.trunc(topSeparatorPosition / itemHeight)
    expect(topScrollers.length).toBe(separatorStartIndex)
  })

  it('renders bottom scrollers of fixed height', () => {
    const wrapper = TestRenderer.create(<WheelPicker itemHeight={40} countVisibleItems={4} />);
    const { itemHeight, countVisibleItems } = wrapper.root.props
    const topSeparatorPosition = wrapper.root.findByProps({ testID: 'topSeparator' }).props.position
    const bottomScrollers = wrapper.root.findAllByProps({ testID: 'bottomScroller' })
    bottomScrollers.forEach((scroller) => expect(scroller.props.height).toBe(itemHeight))

    const separatorStartIndex = Math.trunc(topSeparatorPosition / itemHeight)
    expect(bottomScrollers.length).toBe(countVisibleItems - (separatorStartIndex + 1))
  })
})


it('always renders a unique selected item index', () => {
  const expectedSelectedIndex = 1
  const wrapper = TestRenderer.create(<WheelPicker items={["P0", "P1", "P2", "P3"]} selectedIndex={expectedSelectedIndex} />);

  const selectedItems = wrapper.root.findAllByProps({ testID: 'item', isSelected: true })
  expect(selectedItems.length).toBe(1)
})

it('renders a list of items with their content', () => {
  const expectedItems = ["P0", "P1"]
  const wrapper = TestRenderer.create(<WheelPicker items={expectedItems} />);
  expectedItems.forEach((content) => {
    expect(wrapper.root.findAllByProps({ testID: 'item', content }).length).toBe(1)
  })
})

it('renders a list of items of fixed height', () => {
  const expectedItemHeight = 40
  const wrapper = TestRenderer.create(<WheelPicker itemHeight={expectedItemHeight} items={["P0", "P1"]} />);
  const { items } = wrapper.root.props

  const renderedItems = wrapper.root.findAllByProps({ testID: 'item', height: expectedItemHeight })
  expect(renderedItems.length).toBe(items.length)
})



it('scrolls to selected item position when item selected', () => {
  let wrapper
  act(() => {
    wrapper = TestRenderer.create(<WheelPicker items={["P0", "P1", "P2", "P3"]} selectedIndex={0} />);
  })
  const onSelected = jest.fn()
  const selectedIndex = 2
  act(() => {
    wrapper.update(<WheelPicker onSelected={onSelected} selectedIndex={selectedIndex} items={["P0", "P1", "P2", "P3"]} />);
  })
  const items = wrapper.root.findAllByProps({
    testID: 'item'
  })
  const selectedItem = items[selectedIndex]
  selectedItem.props.onPress()
  expect(selectedItem.props.isSelected).toBe(true)
  expect(onSelected).toBeCalledTimes(1)
  expect(onSelected).toBeCalledWith(selectedIndex)
})

it('automatically select item on draging scroll', () => {
  let wrapper
  const itemHeight = 33
  act(() => {
    wrapper = TestRenderer.create(<WheelPicker itemHeight={itemHeight} />);
  })

  const onSelected = jest.fn()
  const scrollPosition = 200
  act(() => {
    wrapper.update(<WheelPicker onSelected={onSelected} itemHeight={itemHeight} />)
  })
  const scrollView = wrapper.root.findByProps({ testID: 'scrollView' })
  scrollView.props.onScrollBeginDrag()
  scrollView.props.onScroll({
    nativeEvent: {
      contentOffset: {
        y: scrollPosition
      }
    }
  })
  scrollView.props.onScrollEndDrag()
  expect(onSelected).toBeCalledTimes(1)
  expect(onSelected).toBeCalledWith(Math.round(scrollPosition / itemHeight))
})

it('does not notifies first initialization', () => {
  const onSelected = jest.fn()
  let wrapper
  act(() => {
    wrapper = TestRenderer.create(<WheelPicker items={["P0", "P1", "P2", "P3"]} onSelected={onSelected} />);
  })
  expect(onSelected).toBeCalledTimes(0)
})


it('renders a background color', () => {
  const wrapper = TestRenderer.create(<WheelPicker backgroundColor={'red'} />);
  const container = wrapper.root.findByProps({ testID: 'container' })
  expect(container.props.style.backgroundColor).toBe('red')
})

it('renders a style on each iteam', () => {
  const data = ["A", "B"]
  const itemTextStyle = { color: 'red', fontSize: 2 }
  let wrapper
  act(() => {
    wrapper = TestRenderer.create(<WheelPicker backgroundColor={'red'} itemTextStyle={itemTextStyle} items={data} />);
  })
  const items = wrapper.root.findAllByProps({
    testID: 'item'
  })
  expect.assertions(data.length)
  items.forEach((item) => expect(item.props.textStyle).toEqual(itemTextStyle))
})