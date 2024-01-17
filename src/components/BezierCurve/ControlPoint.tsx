import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PointProps } from '../../../types';
import { Color } from '../../constants';

export const ControlPoint: React.FC<PointProps> = ({ style, setCtrlPointPosition, position, id }) => {
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const ctrlPointId = useSharedValue<string>(id);
  const { width, height } = useWindowDimensions();
  const panGesture = Gesture.Pan()
    .onChange(e => {
      translateX.value = e.absoluteX;
      translateY.value = e.absoluteY;
      runOnJS(setCtrlPointPosition)({
        [ctrlPointId.value]: { x: e.absoluteX, y: e.absoluteY },
      });
    })
    .onEnd(e => {
      withDecay({ velocity: e.velocityX, clamp: [height, width] });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.point, animatedStyle, style]} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  point: {
    height: 36,
    width: 36,
    borderRadius: 18,
    zIndex: 1,
    position: 'absolute',
    shadowColor: Color.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
