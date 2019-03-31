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
    // this.props.inputs never changes: the initial state is seeded with this.props.inputs.
    this.state = {
      code: Array(this.props.inputs).fill(''),
      focusStatus: Array(this.props.inputs).fill(false),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  componentDidMount() {

  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valueAsString = e.currentTarget.value;
    const inputIndexAsString = e.currentTarget.dataset.inputindex;
    if (!inputIndexAsString) return;
  
    const isValidCodeNumber = parseInt(valueAsString, 10);

    if (valueAsString !== '' && !isValidCodeNumber) return;
    if (valueAsString.length > 1) return;

    const inputIndexAsNumber =  parseInt(inputIndexAsString, 10);

    const newCode = [...this.state.code];
    newCode[inputIndexAsNumber] = valueAsString;

    const nextFocusStatus = this._getNextFocusStatus(inputIndexAsNumber);
    const isDone = nextFocusStatus.every((status) => status === false);

    this.setState({
      code: newCode,
      focusStatus: nextFocusStatus,
    }, () => { if(isDone) { console.log('DONE') } });
  }
  handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    console.log(document.activeElement);
  }
  _getNextFocusStatus(index: number) {
    const nextIndex = index + 1;
    const newFocusState = this.state.focusStatus.map(() => false);

    if (nextIndex === this.state.code.length) return newFocusState;

    newFocusState[nextIndex] = true;
    return newFocusState;
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
              value={number}
              inputIndex={index}
              isFocused={this.state.focusStatus[index]}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CodeBox;
