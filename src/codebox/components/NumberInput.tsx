import React from 'react';

interface NumberInputProps {
  value: string;
  inputIndex: number;
  isFocused: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};

class NumberInput extends React.Component<NumberInputProps> {
  private ref :React.RefObject<HTMLInputElement>;
  constructor(props: NumberInputProps) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidUpdate(prevProps: NumberInputProps) {
    if(this.props.isFocused) {
      this.ref.current!.focus();
    }
  }
  render() {
    const { value, inputIndex, handleChange, handleFocus  } = this.props;
    return (
      <input
        type="tel"
        value={value}
        placeholder="0"
        onChange={handleChange}
        onFocus={handleFocus}
        className="codebox__input"
        data-inputindex={inputIndex}
        ref={this.ref}
      />
    );
  }
}

export default NumberInput;
