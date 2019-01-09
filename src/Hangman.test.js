import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hangman from './Hangman';
import ReactDOM from 'react-dom';

describe('<Hangman />', function() {
  // smoke test
  it('renders without crashing', function() {
    shallow(<Hangman />);
  });

  // snapshot test
  it('matches snapshot', function() {
    const wrapper = shallow(<Hangman />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});

/* enzyme selector tests */

// default state
it('has a default STATES of nWrong and answer to start', function() {
  const wrapper = shallow(<Hangman />);
  // has two default states: images and maxWrong
  expect(wrapper.state().nWrong).toBe(0);
  expect(wrapper.state().answer).toBe('apple');
});

// default props
it('has a default PROPS of nWrong and answer to start', function() {
  const wrapper = mount(<Hangman />);

  // has two default states: images and maxWrong
  expect(wrapper.props()).toHaveProperty('maxWrong');
  expect(wrapper.props().maxWrong).toBe(6);
});
