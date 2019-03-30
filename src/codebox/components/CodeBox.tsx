import React from 'react';
import NumberInput from './NumberInput';

interface CodeBoxProps {
  inputs: number;
  placeholder: number;
};

class CodeBox extends React.Component<CodeBoxProps> {
  render() {
    const { inputs, placeholder } = this.props;
    let emptyInputs = Array(inputs).fill(null);
    return (
      <div className="codebox">
        <div className="codebox__code">
          {emptyInputs.map((_, index) => (
            <NumberInput
              key={`codeInput-${index}`}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CodeBox;
