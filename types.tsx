import { ReactNode } from 'react';
import { ViewStyle } from 'react-native/types';

export interface LayoutProps {
  children: ReactNode;
  slideInLeft?: boolean;
  title?: string;
  style?: ViewStyle;
}

export interface ListType {
  name: string;
  description: string;
  icon: string;
  screenName: string;
}

export enum IconSize {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XLG = 'xlg',
}