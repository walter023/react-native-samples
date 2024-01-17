import { ReactNode } from 'react';
import { ViewStyle } from 'react-native/types';


export interface LayoutProps {
  children: ReactNode;
  slideInLeft?: boolean;
  title?: string;
  style?: ViewStyle;
}
