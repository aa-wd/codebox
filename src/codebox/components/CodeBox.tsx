import React from 'react';
import NumberInput from './NumberInput';

interface CodeBoxProps {
  inputs: number;
  cb: (code: number[]) => void;
};

interface CodeBoxState {
  code: string[];
  placeholders: string[];
  focusStatus: boolean[];
};

class CodeBox extends React.Component<CodeBoxProps, CodeBoxState> {
  constructor(props: CodeBoxProps) {
    super(props);
    /**
     * this.props.inputs never changes after it is set,
     * so it's safe to use props to set state here.
     */
    const focusStatus = Array(this.props.inputs).fill(false);
    focusStatus[0] = true;
  
    this.state = {
      code: Array(this.props.inputs).fill(''),
      placeholders: Array(this.props.inputs).fill('0'),
      focusStatus: focusStatus,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.clearFocus = this.clearFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valueAsString = e.currentTarget.value;
    const inputIndexAsString = e.currentTarget.dataset.inputindex;
    if (!inputIndexAsString) return;
  
    const isValidCodeNumber = !Number.isNaN(parseInt(valueAsString));

    if (valueAsString !== '' && !isValidCodeNumber) return;
    if (valueAsString.length > 1) return;

    const inputIndexAsNumber =  parseInt(inputIndexAsString);
    const { code, placeholders } = this.state;

    const newCode = [...code];
    const newPlaceholders = [...placeholders];

    newCode[inputIndexAsNumber] = valueAsString;
    newPlaceholders[inputIndexAsNumber] = valueAsString;

    const nextFocusStatus = this.getNextFocusStatus(inputIndexAsNumber, newCode);

    const isDone = nextFocusStatus.every(status => status === false);

    if (isDone && document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    this.setState({
      code: newCode,
      focusStatus: nextFocusStatus,
      placeholders: newPlaceholders,
    }, () => {
      if(isDone) {
        const codeAsNumbers = this.state.code.map(numAsString => parseInt(numAsString));
        this.props.cb(codeAsNumbers);
      }});
  }
  handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const inputIndex = parseInt(e.currentTarget.dataset.inputindex!);

    let lastEmptyInputIndex = inputIndex;

    for (let i = inputIndex - 1; i > -1; i--) {
      if (this.state.code[i] === '') {
        lastEmptyInputIndex = i;
      } else break;
    }

    if (lastEmptyInputIndex === inputIndex && this.state.code[inputIndex] === '') return;

    const newFocusStatus = [...this.state.focusStatus];
    // only change focused input when focusing empty input.
    newFocusStatus[lastEmptyInputIndex] = true;

    // remove current value, which will display the current value as placeholder
    const newCode = [...this.state.code];
    newCode[inputIndex] = '';

    this.setState({
      focusStatus: newFocusStatus,
      code: newCode,
    });
  }
  getNextFocusStatus(previousIndex: number, nextCode: string[]) {
    const { code, focusStatus } = this.state;

    /**
     * On deleting input with value, or when next input has value set:
     * do not focus next input
     */
    const isFollowedByInputWithValue = previousIndex + 1 !== code.length &&  code[previousIndex + 1] !== '';
    const nextIndex = isFollowedByInputWithValue ?
      previousIndex :
      previousIndex + 1;
    const newFocusState = focusStatus.map(() => false);

    if (nextIndex === code.length) return newFocusState;
    if (nextCode.every(value => value !== '')) return newFocusState;

    newFocusState[nextIndex] = true;
    return newFocusState;
  }
  clearFocus() {
    this.setState({
      focusStatus: this.state.focusStatus.map(() => false),
    });
  }
  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    /**
     * Move to previous input on backspace if input is empty
     */
    const isBackspaceOnEmptyInput = e.key === 'Backspace' && e.currentTarget.value === '';
    const currentInputIndex = parseInt(e.currentTarget.dataset.inputindex!);
    if (!isBackspaceOnEmptyInput || currentInputIndex === 0) return;
  
    e.preventDefault();

    const newFocusStatus = this.state.focusStatus.map(() => false);
    newFocusStatus[currentInputIndex - 1] = true;
    this.setState({
      focusStatus: newFocusStatus,
    });
  }
  render() {
    return (
      <div className="codebox">
        <div className="codebox__code">
          {this.state.code.map((number, index) => (
            <NumberInput
              key={`codeInput-${index}`}
              handleChange={this.handleChange}
              handleFocus={this.handleFocus}
              handleKeyDown={this.handleKeyDown}
              value={number}
              placeholder={this.state.placeholders[index]}
              inputIndex={index}
              isFocused={this.state.focusStatus[index]}
              clearFocus={this.clearFocus}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CodeBox;
