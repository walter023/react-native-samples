import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Canvas, Fill, ImageShader, Shader, clamp } from '@shopify/react-native-skia';

import { snapPoint } from '../../helpers/utils.ts';
import { cube, pageCurl, glitchMemories, swirl, swap } from '../../helpers/transitions.ts';
import { transition } from '../../helpers/base.ts';
import { useAssets } from '../../helpers/assets.ts';

const { width, height } = Dimensions.get('window');
const transitions = [cube, pageCurl, cube, glitchMemories, swirl, swap, cube].map(t => transition(t));

/*
 // Example usage:
const arr = [1, 2, 3, 4, 5];
console.log(getElementAtIndex(arr, 7)); // Output: 3
console.log(getElementAtIndex(arr, -2)); // Output: 4
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const at = <T,>(array: T[], index: number) => {
  'worklet';

  if (array.length === 0) {
    throw new Error('Array is empty.');
  }
  return array[((index % array.length) + array.length) % array.length];
};

// eslint-disable-next-line import/prefer-default-export
export const Transitions = () => {
  const progressLeft = useSharedValue(0);
  const assets = useAssets();

  const panLeft = useMemo(
    () =>
      Gesture.Pan()
        .onChange(pos => {
          progressLeft.value = clamp(progressLeft.value - pos.changeX / width, 0, 1);
        })
        .onEnd(({ velocityX }) => {
          const dst = snapPoint(progressLeft.value, -velocityX / width, [0, 1]);
          progressLeft.value = withTiming(dst, { duration: 250 });
        }),
    [progressLeft],
  );

  const uniformsLeft = useDerivedValue(() => ({
    progress: progressLeft.value,
    resolution: [width, height],
  }));

  if (!assets) return null;

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panLeft}>
        <Canvas style={styles.container}>
          <Fill>
            <Shader source={transitions[3]} uniforms={uniformsLeft}>
              <ImageShader image={assets[1]} fit="cover" width={width} height={height} />
              <ImageShader image={assets[0]} fit="cover" width={width} height={height} />
            </Shader>
          </Fill>
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
