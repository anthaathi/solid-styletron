import { useContext } from 'solid-js';
import {
  StyletronContext,
  StyletronTheme,
  StyletronThemeContext,
} from '../contexts/styletron';
import type { StyleObject } from 'styletron-standard';

export function useStyletron(): [
  css: (input: StyleObject | StyleObject[]) => string,
  $theme: StyletronTheme
] {
  const styletron = useContext(StyletronContext);
  const $theme = useContext(StyletronThemeContext);

  if (!styletron) {
    throw new Error('No styletron provided');
  }

  return [
    (input) => {
      if (Array.isArray(input)) {
        const prevValue = {};

        input.forEach((obj) => {
          mergeDeep(prevValue, obj);
        });

        return styletron?.renderStyle(prevValue);
      }

      return styletron?.renderStyle(input);
    },
    $theme,
  ];
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function mergeDeep(target: object, source: object) {
  const isObject = (obj: object) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    // @ts-ignore
    const targetValue = target[key];
    // @ts-ignore
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      // @ts-ignore
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      // @ts-ignore
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      // @ts-ignore
      target[key] = sourceValue;
    }
  });

  return target;
}
