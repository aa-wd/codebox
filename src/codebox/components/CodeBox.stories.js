import React from 'react';
import { storiesOf } from '@storybook/react';
import CodeBox from './CodeBox';

storiesOf('CodeBox', module)
  .addParameters({ viewport: { defaultViewport: 'iphone5' }})
  .add('4 inputs', () => <CodeBox inputs={4} />);
