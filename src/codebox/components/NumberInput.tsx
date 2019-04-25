import React from 'react';
import classNames from 'classnames';

interface NumberInputProps {
  value: string;
  placeholder: string;
  inputIndex: number;
  isFocused: boolean;
  isDisabled: boolean;
  hasSmallerInput: boolean;
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
      value, placeholder, inputIndex, isDisabled, hasSmallerInput,
      handleChange, handleFocus, handleKeyDown
    } = this.props;
    const smallerSize = hasSmallerInput && '2rem';
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
        disabled={isDisabled}
        style={{
          fontSize: smallerSize || 'revert',
          width: smallerSize || 'revert',
          height: smallerSize || 'revert',
        }}
      />
    );
  }
}

export default NumberInput;
