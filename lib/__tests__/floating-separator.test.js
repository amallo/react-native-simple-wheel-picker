import React from 'react'
import TestRenderer from 'react-test-renderer';
import FloatingSeparator from '../floating-separator';


it('renders snapshot', () => {
    const wrapper = TestRenderer.create(
        <FloatingSeparator
            testID={'bottomSeparator'}
            height={40}
            position={200}
            backgroundColor={'red'}
            marginHorizontal={40} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
});

it('renders a separator', () => {
    const wrapper = TestRenderer.create(
        <FloatingSeparator
            height={40}
            position={200}
            backgroundColor={'red'}
            marginHorizontal={40} />);

    const separator = wrapper.root.findByProps({ testID: 'floatingSeparatorView' })
    expect(separator.props.style).toContainEqual({
        height: 40,
        backgroundColor: 'red',
        top: 200,
        left: 40,
        right: 40
    })
})