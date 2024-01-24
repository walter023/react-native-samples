import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Points {
  [key: string]: {
    x: number;
    y: number;
  };
}
export interface PointProps {
  style?: ViewStyle;
  setCtrlPointPosition: () => void;
  position: Vector2;
  id: string;
}

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
