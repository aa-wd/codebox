import React from 'react';
import classNames from 'classnames';

interface NumberInputProps {
  value: string;
  placeholder: string;
  inputIndex: number;
  isFocused: boolean;
  clearFocus: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

class NumberInput extends React.Component<NumberInputProps> {
  private ref :React.RefObject<HTMLInputElement>;
  constructor(props: NumberInputProps) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.focusInput();
  }
  componentDidUpdate(prevProps: NumberInputProps) {
    this.focusInput();
  }
  focusInput() {
    if(this.props.isFocused) {
      this.ref.current!.focus();
      this.props.clearFocus();
    }
  }
  render() {
    const {
      value, placeholder, inputIndex,
      handleChange, handleFocus, handleKeyDown
    } = this.props;
    return (
      <input
        type="tel"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={classNames("codebox__input", {
          "codebox__input--valid" : value !== ''
        })}
        data-inputindex={inputIndex}
        ref={this.ref}
      />
    );
  }
}

export default NumberInput;
