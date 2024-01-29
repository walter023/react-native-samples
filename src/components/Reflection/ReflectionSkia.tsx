import React, { useEffect } from 'react';
import { BlurMask, Canvas, Path, usePathValue } from '@shopify/react-native-skia';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';

import { intersectionPoint, reflect } from '../../helpers/index.tsx';
import { ANGLE, Color, DURATION } from '../../constants/index.ts';
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

  return (
    <Canvas style={{ flex: 1 }}>
      <Path path={pathValue} color={Color.CYAN} style="stroke" strokeWidth={2} />
      <Path path={pathValue} color={Color.CYAN} strokeWidth={2}>
        <BlurMask blur={6} style="outer" />
      </Path>
    </Canvas>
  );
};
export default ReflectionSkia;
