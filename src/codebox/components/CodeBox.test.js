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
});
