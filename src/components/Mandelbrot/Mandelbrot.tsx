import React from 'react';
import { Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import { corner } from '../../helpers/madelbrot/madelbrot.ts';
import { Madelbrot } from '../../helpers/madelbrot/base.ts';

const MadelBrotCorner = () => {
  const { height, width } = useWindowDimensions();
  const iResolution = vec(width, height);
  const clock = useClock();
  const uniforms = useDerivedValue(() => ({ iResolution, iTime: clock.value }), [clock]);

  return (
    <Canvas style={{ ...styles.container, height, width }}>
      <Fill>
        <Shader source={Madelbrot(corner)} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
});

export default MadelBrotCorner;
