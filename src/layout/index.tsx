/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from '../constants/index.ts';
import { LayoutProps } from '../../types.ts';
import * as theme from '../theme.ts';

const Layout: React.FC<LayoutProps> = ({ children, slideInLeft = true, title, style }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(width);
  const LayoutView = Animated.createAnimatedComponent(SafeAreaView);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 });
  }, [translateX]);

  const animateStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <LayoutView style={[styles(isDarkMode).container, slideInLeft && animateStyles, style]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.home(isDarkMode).headerBg} />
      {title && (
        <View style={[styles(isDarkMode).headerContainer]}>
          <Text style={styles(isDarkMode).headerText}>{title}</Text>
        </View>
      )}
      {children}
    </LayoutView>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.home(isDarkMode).headerBg,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: theme.home(isDarkMode).headerBg,
      borderColor: theme.home(isDarkMode).borderColor,
      height: 52,
    },
    headerText: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkMode ? Colors.WHITE : Colors.BLACK,
    },
  });

export default Layout;
