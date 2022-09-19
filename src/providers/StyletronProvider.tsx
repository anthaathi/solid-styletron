import type { Component, JSX } from 'solid-js';
import type { StandardEngine } from 'styletron-standard';
import {
  StyletronContext,
  StyletronTheme,
  StyletronThemeContext,
} from '../contexts/styletron';

export interface StyletronProviderProps {
  client: StandardEngine;
  theme: StyletronTheme;
  children: JSX.Element;
}

export const StyletronProvider: Component<StyletronProviderProps> = (props) => {
  return (
    <StyletronContext.Provider value={props.client}>
      <StyletronThemeContext.Provider value={props.theme}>
        {props.children}
      </StyletronThemeContext.Provider>
    </StyletronContext.Provider>
  );
};
