import React from 'react';
import { shallow } from 'enzyme';
import CodeBox from './CodeBox';
import NumberInput from './NumberInput';

const getEventData = (value, inputindex) => ({
  currentTarget: {
    value,
    dataset: {
      inputindex
    }
  }
});

const createBasicInstance = () => shallow(<CodeBox inputs={4} />).instance();

describe('<CodeBox />', () => {
  test('renders correct amount of inputs', () => {
    const amount = 4;
    let codebox = shallow(<CodeBox inputs={amount} />);
    expect(codebox.find(NumberInput).length).toBe(amount);
  });

  test('initiates code array to empty strings from inputs', () => {
    const amount = 6;
    const codebox = shallow(<CodeBox inputs={amount} />);
    expect(codebox.instance().state.code).toEqual(Array(amount).fill(''));
  });

  test('updates input at correct index', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('9', '1'));
    expect(instance.state.code[1]).toBe('9');
  });

  test('only allows single character as value', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('5', '2'));
    const snapshot = [...instance.state.code];

    instance.handleChange(getEventData('55', '2'));
    expect(instance.state.code).toEqual(snapshot);
  });

  test('resets value to empty string on backspace', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('', '0'));
    expect(instance.state.code[0]).toBe('');
  });

  test('does not update on NaN values', () => {
    const instance = createBasicInstance();
    const snapshot = [...instance.state.code];
    instance.handleChange(getEventData('d', '2'));
    expect(instance.state.code).toEqual(snapshot);
  });

  test('updates on 0 value', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('0', '1'));
    expect(instance.state.code[1]).toEqual('0');
  });

  test('returns next focus status', () => {
    const instance = createBasicInstance();
    let nextFocusStatus = instance.getNextFocusStatus(0, ['1', '', '', '']);
    expect(nextFocusStatus).toEqual([false, true, false, false]);

    nextFocusStatus = instance.getNextFocusStatus(3);
    expect(nextFocusStatus).toEqual(Array(4).fill(false));
  });

  test('sets next focus state as state', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('5', '2'));
    expect(instance.state.focusStatus[3]).toEqual(true);
  });

  test('on focus, it sets isFocused to last empty input', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('1', '0'));
    instance.handleFocus({ currentTarget: { dataset: { inputindex: 3 } } });
    expect(instance.state.focusStatus).toEqual([false, true, false, false]);
  });

  test('sets placeholder value with last received input value', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('5', '0'));
    expect(instance.state.placeholders['0']).toBe('5');
  });

  test('replaces an input with value with empty string if focused', () => {
    const instance = createBasicInstance();
    instance.handleChange(getEventData('6', '0'));
    instance.handleFocus(getEventData('6', '0'));
    expect(instance.state.code[0]).toBe('');
  });
});
