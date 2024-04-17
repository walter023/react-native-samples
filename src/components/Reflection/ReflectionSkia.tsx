import React, { useEffect } from 'react';
import { BlurMask, Canvas, Path, usePathValue, Circle } from '@shopify/react-native-skia';
import { interpolateColor, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { intersectionPoint, reflect } from '../../helpers/utils.ts';
import { ANGLE, Colors, DURATION } from '../../constants/index.ts';
import { Vector2 } from '../../../types.ts';

const ReflectionSkia: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yOrigin = height / 1.2;
  const xOrigin = width / 2;
  const xRay = useSharedValue<number>(0);
  const yRay = useSharedValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const loop = useSharedValue<number>(0);

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
    loop.value = withRepeat(withTiming(100), -1, false);
  });

  const pathValue = usePathValue(path => {
    'worklet';

    const radians = (angle.value * Math.PI) / 180;
    xRay.value = Math.round(xOrigin + Math.cos(radians) * height);
    yRay.value = Math.round(yOrigin + Math.sin(radians) * height);
    const hitPoint = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xOrigin, y: yOrigin }, { x: width, y: height });
    const incomingVector: Vector2 = { x: xRay.value - hitPoint.x, y: yRay.value - hitPoint.y };
    const normalizedVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    const reflectedVector = reflect(incomingVector, normalizedVector);

    path.moveTo(xOrigin, yOrigin);
    path.lineTo(xRay.value, yRay.value);
    path.moveTo(hitPoint.x, hitPoint.y);
    path.lineTo(reflectedVector.x * height, reflectedVector.y * height);
  });

  const color = useDerivedValue(() => interpolateColor(loop.value, [0, 300], [Colors.PALE_PINK, Colors.SOFT_RED]), [loop]);

  return (
    <Canvas style={styles.container}>
      <Path path={pathValue} color={color} style="stroke" strokeWidth={2} />
      <Path path={pathValue} color={color} strokeWidth={2}>
        <BlurMask blur={6} style="outer" />
      </Path>
      <Circle cx={xOrigin} cy={yOrigin} r={30} color={Colors.RED} />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReflectionSkia;
