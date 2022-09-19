import { useContext } from 'solid-js';
import {
  StyletronContext,
  StyletronTheme,
  StyletronThemeContext,
} from '../contexts/styletron';
import type { StyleObject } from 'styletron-standard';

export function useStyletron(): [
  css: (input: StyleObject) => string,
  $theme: StyletronTheme
] {
  const styletron = useContext(StyletronContext);
  const $theme = useContext(StyletronThemeContext);

  if (!styletron) {
    throw new Error('No styletron provided');
  }

  return [(input: StyleObject) => styletron?.renderStyle(input), $theme];
}
