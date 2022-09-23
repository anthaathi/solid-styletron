import { createContext } from 'solid-js';
import type { StandardEngine } from 'styletron-standard';

export const StyletronContext = createContext<StandardEngine>();
export const StyletronThemeContext = createContext<StyletronTheme>({});

export interface StyletronTheme {
  mediaQueries?: { [kind: string]: string };
}
