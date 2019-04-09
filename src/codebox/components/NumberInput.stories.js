import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberInput from './NumberInput';

const styles = {
  margin: '2rem',
};

const marginDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

storiesOf('NumberInput', module)
  .addDecorator(marginDecorator)
  .add('empty number input', () => <NumberInput value='' />)
  .add('with value', () => <NumberInput value='3' />);
