/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import { ListRenderItemInfo, Pressable, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { isAndroid } from '../../helpers/index.tsx';
import { DATA } from '../../models/index.ts';
import * as theme from '../../theme.ts';
import { NavigationContext } from '../../navigation/index.tsx';
import Icon from '../Icon/index.ts';
import { IconSize } from '../../../types.ts';
import { Color } from '../../constants/index.ts';

interface ListItemProps {
  data: ListRenderItemInfo<(typeof DATA)[0]>;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const { navigate } = useContext(NavigationContext);
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const { index, item } = data;
  const itemWidth = width - 24;

  useEffect(() => {
    const easing = Easing.bezier(0.4, 0.0, 0.2, 1.0);
    translateY.value = withDelay(index * (1000 / 3), withTiming(0, { duration: 1000, easing }));
    opacity.value = withDelay(index * (1000 / 3), withTiming(1, { duration: 1000, easing }));
  }, [index, translateY, opacity]);

  const animateStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const onPressed = () => {
    navigate(item.screenName);
  };

  return (
    <Animated.View style={[themeStyles(isDarkMode).listItemContainer, { width: itemWidth }, animateStyles]}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: isAndroid && pressed ? 0.8 : 1,
            width: itemWidth,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
          styles.button,
        ]}
        android_ripple={styles.ripple}
        onPress={onPressed}
      >
        <Icon name={item.icon} size={IconSize.XLG} fill={isDarkMode ? Color.WHITE : Color.DARK} />
        <View style={styles.cardDetails}>
          <Text style={themeStyles(isDarkMode).listItemTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={themeStyles(isDarkMode).listItemDesc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listItemImage: {
    width: 80,
    height: 80,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
  },
  button: {
    flexDirection: 'row',
    padding: 8,
  },
  ripple: {
    color: 'rgba(128,128,128,0.3)',
  },
  cardDetails: {
    padding: 8,
    flex: 1,
  },
});

const themeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    listItemContainer: {
      backgroundColor: theme.home(isDarkMode).listItemBg,
      borderRadius: 8,
      margin: 4,
      marginVertical: 8,
      overflow: isAndroid ? 'hidden' : 'visible',
      shadowColor: theme.home(isDarkMode).shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 16,
    },
    listItemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.home(isDarkMode).itemTextColor,
    },
    listItemDesc: {
      fontSize: 12,
      color: theme.home(isDarkMode).itemDescColor,
      paddingVertical: 4,
    },
  });

export default ListItem;
