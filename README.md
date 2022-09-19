# Styletron with SolidJS

Integrates [Styletron](https://styletron.org/) to the [SolidJS](https://solidjs.com/). 

## Installation

Add package to the app.

```bash
yarn add @anthaathi/solid-styletron styletron-engine-atomic
```

Configure the Styletron

```tsx
import type {Component} from 'solid-js';
import {StyletronProvider, useStyletron} from '@anthaathi/solid-styletron';
import {Client} from 'styletron-engine-atomic';
import {} from "./useStyletron";

// Configure theme object
const THEME_OBJECT = {
    colorRed: 'red',
};

// Initiate client for styletron
const client = new Client({prefix: '_'});

function Elem(props) {
    const [css, $theme] = useStyletron();

    return <div class={css({ color: $theme.colorRed })}>{props.children}</div>
}

function App() {
    <StyletronProvider theme={THEME_OBJECT} client={client}>
        <Elem/>
    </StyletronProvider>
}

// Declare custom theme
declare module '@anthaathi/solid-styletron' {
    export type StyletronTheme = {
        colorRed: string;
    }
}
```
