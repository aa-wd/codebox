import React from 'react';
import NumberInput from './NumberInput';

interface CodeBoxProps {
  inputs: number;
};

interface CodeBoxState {
  code: string[];
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

    const newCode = [...this.state.code];
    newCode[inputIndexAsNumber] = valueAsString;

    const nextFocusStatus = this.getNextFocusStatus(inputIndexAsNumber, valueAsString === '');
    const isDone = nextFocusStatus.every((status) => status === false);

    this.setState({
      code: newCode,
      focusStatus: nextFocusStatus,
    }, () => { if(isDone) { console.log('DONE') } });
  }
  handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const inputIndex = parseInt(e.currentTarget.dataset.inputindex!);

    let lastEmptyInputIndex = inputIndex;

    for (let i = inputIndex - 1; i > -1; i--) {
      if (this.state.code[i] === '') {
        lastEmptyInputIndex = i;
      } else break; 
    }

    if (lastEmptyInputIndex === inputIndex) return; // every input before has a valid value
  
    const newFocusStatus = [...this.state.focusStatus];
    newFocusStatus[lastEmptyInputIndex] = true;

    this.setState({
      focusStatus: newFocusStatus,
    });
  }
  getNextFocusStatus(previousIndex: number, isEmptyString: boolean) {
    /**
     * On deleting input with value, do not focus next input
     */
    const nextIndex = isEmptyString ? previousIndex : previousIndex + 1;
    const newFocusState = this.state.focusStatus.map(() => false);

    if (nextIndex === this.state.code.length) return newFocusState;

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
    })
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
