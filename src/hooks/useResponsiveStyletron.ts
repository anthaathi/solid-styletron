import { StyleObject } from 'styletron-standard';
import type {
  AtRule,
  ObsoleteProperties,
  Property,
  StandardProperties,
  SvgProperties,
  VendorProperties,
} from 'csstype';
import { useStyletron } from './useStyletron';
import { StyletronTheme } from '../contexts/styletron';

export type ResponsiveStyleObject = Properties & {
  [key in string]: Properties[keyof Properties] | StyleObject;
};

export function useResponsiveStyletron(): [
  css: (input: ResponsiveStyleObject) => string,
  $theme: StyletronTheme
] {
  const [$css, $theme] = useStyletron();

  function css(input: ResponsiveStyleObject) {
    const returnObject: StyleObject = {};
    const mediaQueriesKeys = Object.keys($theme.mediaQueries || {});

    Object.keys(input).forEach((key) => {
      const inputElement = input[key];

      if (Array.isArray(inputElement)) {
        inputElement.forEach((item, index) => {
          const mediaQuery = $theme.mediaQueries?.[mediaQueriesKeys[index]];

          if (!mediaQuery) {
            console.warn('mediaQuery not found for index', index);
            return;
          }

          returnObject[mediaQuery] = returnObject[mediaQuery] || {};
          // @ts-ignore
          returnObject[mediaQuery][key] = item as never;
        });
        return;
      }

      // @ts-ignore
      returnObject[key] = inputElement;
    });

    return $css(returnObject);
  }

  return [css, $theme];
}

export interface KeyframesPercentageObject {
  [key: string]: Properties;
}

export type KeyframesObject = KeyframesPercentageObject & {
  from?: Properties;
  to?: Properties;
};

export type AnimationNameProperty =
  | Property.AnimationName
  | KeyframesObject
  | Property.AnimationName[]
  | KeyframesObject[];

export type FontFace = AtRule.FontFace<TLength>;

export type FontFamilyProperty = Property.FontFamily | FontFace;

type TLength = string | 0 | string[] | number[];

export type Properties = {
  animationName?: AnimationNameProperty;
  fontFamily?: FontFamilyProperty | FontFamilyProperty[];
  MozAnimationName?: AnimationNameProperty;
  WebkitAnimationName?: AnimationNameProperty;
  OAnimationName?: AnimationNameProperty;
} & Omit<
  StandardProperties<TLength> &
    VendorProperties<TLength> &
    ObsoleteProperties<TLength> &
    SvgProperties<TLength>,
  | 'animationName'
  | 'fontFamily'
  | 'MozAnimationName'
  | 'WebkitAnimationName'
  | 'OAnimationName'
>;
