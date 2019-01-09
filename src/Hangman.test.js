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
  expect(wrapper.state().guessed).toBeInstanceOf(Set);
});

// default props
it('has a default PROPS of nWrong and answer to start', function() {
  const wrapper = mount(<Hangman />);

  expect(wrapper.props()).toHaveProperty('maxWrong');
  expect(wrapper.props().maxWrong).toBe(6);
});

// generateButton()
it('generates a button for each letter', function() {
  const wrapper = shallow(<Hangman />);

  const button = wrapper.find('button');
  //   make sure 26 keys were generated
  expect(button).toHaveLength(26);
});

// test single button works
it('test single button works', function() {
  const wrapper = mount(<Hangman />);
  expect(wrapper.state().guessed.has('a')).toEqual(false);

  //   simulate click on 'A' button and pass in simulated evt target
  let buttonA = wrapper.find("button[value='a']");
  buttonA.simulate('click', { target: { value: 'a' } });
  buttonA = wrapper.find("button[value='a']");

  //   expect(wrapper.state().guessed.has('a')).toEqual(true);
  expect(buttonA.props().disabled).toBe(true);
});

// test that game ends when nWrong > maxWrong
// it('test game ends when maxWrong is exceeded', function() {
//   const wrapper = shallow(<Hangman />);
//   wrapper.setState({ nWrong: 7 });
//   // shouldn't be able to guess more...

//   expect(wrapper.state().guessed.has('a')).toEqual(true);
// });
