import React from 'react';

interface NumberInputProps {
  value: string;
  inputIndex: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput : React.FunctionComponent<NumberInputProps> = ({ value, inputIndex, handleChange }) => (
  <input
    value={value}
    onChange={handleChange}
    placeholder="0"
    type="tel"
    className="codebox__input"
    data-inputindex={inputIndex}
  />
);

export default NumberInput;
