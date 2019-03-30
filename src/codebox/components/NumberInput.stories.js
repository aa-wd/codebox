import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberInput from './NumberInput';

storiesOf('NumberInput', module)
  .add('empty number input', () => <NumberInput />);
