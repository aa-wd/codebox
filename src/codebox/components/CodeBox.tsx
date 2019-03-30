import React from 'react';
import NumberInput from './NumberInput';

interface CodeBoxProps {
  inputs: number;
  placeholder: number;
};

interface CodeBoxState {
  code: string[];
};

class CodeBox extends React.Component<CodeBoxProps, CodeBoxState> {
  constructor(props: CodeBoxProps) {
    super(props);
    // this.props.inputs never changes: the initial state is seeded with this.props.inputs.
    this.state = {
      code: Array(this.props.inputs).fill(''),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valueAsString = e.currentTarget.value;
    const inputIndexAsString = e.currentTarget.dataset.inputindex;
    if (!inputIndexAsString) return;
  
    const isValidCodeNumber = parseInt(valueAsString, 10);

    if (valueAsString !== '' && !isValidCodeNumber) return;
    if (valueAsString.length > 1) return;

    console.log(valueAsString)

    const inputIndexAsNumber =  parseInt(inputIndexAsString, 10);

    const newCode = [...this.state.code];
    newCode[inputIndexAsNumber] = valueAsString;

    this.setState({
      code: newCode,
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
              value={number}
              inputIndex={index}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CodeBox;
