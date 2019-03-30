import React from 'react';
import { shallow } from 'enzyme';
import NumberInput from './NumberInput';

describe('<NumberInput />', () => {
  test('renders input with "tel" type', () => {
    const input = shallow(<NumberInput />);
    expect(input.find('input[type="tel"]').length).toBe(1);
  });

  test('outputs prop value as input value', () => {
    const amount = 3;
    const input = shallow(<NumberInput value={amount} />);
    expect(input.prop('value')).toBe(amount);
  });
});
