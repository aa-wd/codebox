# codebox

Simple UI component for receiving short, numeric passwords / codes from users. On completion a callback is called with the received code as argument. Built with React + Typescript. Optimized for small screens. [See a demo here](https://w755q37pok.codesandbox.io/).



## Installation

```console
npm install --save @aawd/codebox
```
Important: also add the stylesheet (see: `./styles/css.css`) !

## Usage
Import named export:
```js
import { CodeBox } from "@aawd/codebox";
```

Call the `CodeBox` component with at least the `inputs` and `callback` props. `inputs` is one of `4`, `5`, `6` or `8`. ([check the demo](https://w755q37pok.codesandbox.io/) to see how it looks like).

```tsx
<CodeBox
  inputs={6}
  callback={(code) => {
    /**
     * code is an array of numbers. Here you can call your backend and validate the 
     * code, or do whatever you want with the received code.
     */ 
    console.log(`Callback called! With value ${code}`);
  }}
/>
```

The component can be rendered as read-only and/or feeded with a start number. Its Typescript interface is:


```tsx
interface CodeBoxProps {
  inputs: 4 | 5 | 6 | 8;
  callback: (code: number[]) => void;
  isReadOnly?: boolean;
  startCode?: string[];
};
```

## Font
The stylesheet points to fonts at `https://files.aawd.nl/codebox/rubik-numbers.woff2` and `https://files.aawd.nl/codebox/rubik-numbers.ttf`. These are **subsets** of the Rubik font: only the numbers 0 to 9 are included in the subset. The sizes for the `WOFF2` and `TTF` file are 3.5k and 6.8k respectively. Of course you can choose your own font and override the stylesheet.

## License
[ISC](https://choosealicense.com/licenses/isc/)
