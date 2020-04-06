import React from 'react'
import TestRenderer from 'react-test-renderer';
import Item from '../item'

it('renders a snapshot', () => {
    const wrapper = TestRenderer.create(<Item />);
    expect(wrapper.toJSON()).toMatchSnapshot();
})

it('renders a touchable item', () => {
    const onPress = jest.fn()
    const wrapper = TestRenderer.create(<Item onPress={onPress} />);
    const container = wrapper.root.findByProps({ testID: 'container-item' })
    container.props.onPress()
    expect(onPress).toBeCalledTimes(1)
})

it('customizes background color', () => {
    const onPress = jest.fn()
    const wrapper = TestRenderer.create(<Item onPress={onPress} backgroundColor={'red'} />);
    const container = wrapper.root.findByProps({ testID: 'container-item' })
    expect(container.props.style.backgroundColor).toBe('red')
})

it('renders a bold text if selected item', () => {
    const onPress = jest.fn()
    const wrapper = TestRenderer.create(<Item onPress={onPress} isSelected={true} backgroundColor={'red'} />);
    const text = wrapper.root.findByProps({ testID: 'text-item' })
    expect(text.props.style).toContainEqual({ fontWeight: 'bold', "color": "#37474F" })
})

it('renders a normal text if unselected item', () => {
    const onPress = jest.fn()
    const wrapper = TestRenderer.create(<Item onPress={onPress} isSelected={false} />);
    const text = wrapper.root.findByProps({ testID: 'text-item' })
    expect(text.props.style).toContainEqual({ fontWeight: 'normal', "color": "#ADADAD" })
})

it('renders a text content', () => {
    const content = "Hello this is a content"
    const wrapper = TestRenderer.create(<Item content={content} />);
    const text = wrapper.root.findByProps({ testID: 'text-item' })
    expect(text.props.children).toBe(content)
})

it('renders with a fixed height', () => {
    const height = 12
    const wrapper = TestRenderer.create(<Item height={height} />);
    const container = wrapper.root.findByProps({ testID: 'container-item' })
    expect(container.props.style.height).toBe(height)
})

it('renders a text style', () => {
    const textStyle = { color: 'red', fontSize: 2 }
    const wrapper = TestRenderer.create(<Item textStyle={textStyle} />);
    const text = wrapper.root.findByProps({ testID: 'text-item' })
    expect(text.props.style).toContainEqual(textStyle)
})