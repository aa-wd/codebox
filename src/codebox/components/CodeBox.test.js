import React from 'react';
import { shallow } from 'enzyme';
import CodeBox from './CodeBox';
import NumberInput from './NumberInput';

describe('<CodeBox />', () => {
  test('renders correct amount of inputs', () => {
    const amount = 4;
    let codebox = shallow(<CodeBox inputs={amount} />);
    expect(codebox.find(NumberInput).length).toBe(amount);
  });
});
