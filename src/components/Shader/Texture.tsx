import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Canvas, Fill, ImageShader, Shader, clamp } from '@shopify/react-native-skia';

import { snapPoint } from '../../helpers/utils.ts';
import { cube, pageCurl /*  glitchMemories, swirl, swap */ } from '../../helpers/transitions.ts';
import { transition } from '../../helpers/base.ts';
import { useAssets } from '../../helpers/assets.ts';

const { width, height } = Dimensions.get('window');

/*
 // Example usage:
const arr = [1, 2, 3, 4, 5];
console.log(getElementAtIndex(arr, 7)); // Output: 3
console.log(getElementAtIndex(arr, -2)); // Output: 4
*/

const at = <T,>(array: T[], index: number) => {
  'worklet';

  if (!array) return null;
  if (array.length === 0) {
    throw new Error('Array is empty.');
  }
  return array[((index % array.length) + array.length) % array.length];
};

// eslint-disable-next-line import/prefer-default-export
export const Transitions = () => {
  const indexOffset = useSharedValue(0);
  const progressLeft = useSharedValue(0);
  const progressRight = useSharedValue(0);
  const assets = useAssets();

  const panLeft = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(-5)
        .onChange(pos => {
          progressLeft.value = clamp(progressLeft.value - pos.changeX / width, 0, 1);
        })
        .onEnd(({ velocityX }) => {
          const dst = snapPoint(progressLeft.value, -velocityX / width, [0, 1]);
          progressLeft.value = withTiming(dst, { duration: 250 }, () => {
            if (dst === 1) {
              indexOffset.value += 1;
              progressLeft.value = 0;
            }
          });
        }),
    [progressLeft, indexOffset],
  );

  const panRight = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(5.0)
        .onChange(pos => {
          progressRight.value = clamp(progressRight.value + pos.changeX / width, 0, 1);
        })
        .onEnd(({ velocityX }) => {
          const dst = snapPoint(progressRight.value, -velocityX / width, [0, 1]);
          progressRight.value = withTiming(dst, { duration: 250 }, () => {
            if (dst === 1) {
              indexOffset.value -= 1;
              progressRight.value = 0;
            }
          });
        }),
    [progressRight, indexOffset],
  );

  const asset1 = useDerivedValue(() => at(assets!, indexOffset.value - 1));
  const asset2 = useDerivedValue(() => at(assets!, indexOffset.value));
  const asset3 = useDerivedValue(() => at(assets!, indexOffset.value + 1));

  const uniformsLeft = useDerivedValue(() => ({
    progress: progressLeft.value,
    resolution: [width, height],
  }));

  const uniformsRight = useDerivedValue(() => ({
    progress: progressRight.value,
    resolution: [width, height],
  }));

  if (!assets) return null;

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Race(panLeft, panRight)}>
        <Canvas style={styles.container}>
          <Fill>
            <Shader source={transition(cube)} uniforms={uniformsRight}>
              <Shader source={transition(pageCurl)} uniforms={uniformsLeft}>
                <ImageShader image={asset2} fit="cover" width={width} height={height} />
                <ImageShader image={asset3} fit="cover" width={width} height={height} />
              </Shader>
              <ImageShader image={asset1} fit="cover" width={width} height={height} />
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
