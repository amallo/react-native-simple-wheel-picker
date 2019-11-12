import React from 'react'
import TestRenderer from 'react-test-renderer';
import WheelPicker from 'lib/wheel-picker';

it('renders snapshot', () => {
  const wrapper = TestRenderer.create(<WheelPicker />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});
