import React from 'react';
import { storiesOf } from '@storybook/react';
import CodeBox from './CodeBox';

storiesOf('CodeBox', module)
  .addParameters({ viewport: { defaultViewport: 'iphone5' }})
  .add('4 inputs', () => <CodeBox inputs={4} callback={() => {console.log('DONE!')}} />)
  .add('5 inputs', () => <CodeBox inputs={5} callback={() => {console.log('DONE!')}} />)
  .add('6 inputs', () => <CodeBox inputs={6} callback={() => {console.log('DONE!')}} />)
  .add('8 inputs', () => <CodeBox inputs={8} callback={() => {console.log('DONE!')}} />)
  .add('disabled inputs with content', () => <CodeBox inputs={4} isReadOnly={true} startCode={['4', '0', '0', '7']} callback={() => {console.log('DONE!')}} />)
  .add('disabled inputs; NO content', () => <CodeBox inputs={4} isReadOnly={true} callback={() => {console.log('DONE!')}} />);
