import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { IconSize } from '../../../types.ts';
import { NavigationContext } from '../../navigation/index.tsx';
import * as theme from '../../theme.ts';
import Icon from '../Icon/index.ts';

const BackButton: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { back } = useContext(NavigationContext);

  return (
    <TouchableOpacity style={themeStyles(isDarkMode).container} onPress={back}>
      <Icon name="backButton" size={IconSize.MD} fill={theme.home(!isDarkMode).headerBg} />
    </TouchableOpacity>
  );
};
const themeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      zIndex: 100,
      backgroundColor: theme.home(isDarkMode).listItemBg,
      borderRadius: 20,
      shadowColor: theme.home(isDarkMode).shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.9,
      shadowRadius: 8.65,
      elevation: 16,
      position: 'absolute',
      left: 25,
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });

export default BackButton;
