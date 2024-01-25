import React, { useEffect } from 'react';
import { Canvas, Path, usePathValue } from '@shopify/react-native-skia';
import { useSharedValue, withRepeat, withTiming, useDerivedValue } from 'react-native-reanimated';
import {  useWindowDimensions } from 'react-native';
import { ANGLE, DURATION } from '../../constants/index.ts';
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

  const intersectionPoint = (incomingVector: Vector2, origin: Vector2): Vector2 => {
    'worklet';

    const vector = { x: incomingVector.x - origin.x, y: incomingVector.y - origin.y };
    const slope = vector.y / vector.x;
    const xEdge = vector.x > 0 ? width : 0;
    const yEdge = slope * (xEdge - origin.x) + origin.y;
    let hitPoint = { x: xEdge, y: yEdge };
    //  vertical case
    if (yEdge > height || yEdge < 0) {
      hitPoint = { x: origin.x - origin.y / slope, y: 0 };
    }
    return { x: Math.round(hitPoint.x), y: Math.round(hitPoint.y) };
  };

  const reflect = (incomingVector: Vector2, normalVector: Vector2): Vector2 => {
    'worklet';

    const scalarProjection = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
    return {
      x: incomingVector.x - 2 * scalarProjection * normalVector.x,
      y: incomingVector.y - 2 * scalarProjection * normalVector.y,
    };
  };

  const clip = usePathValue(path => {
    'worklet';

    const radians = (angle.value * Math.PI) / 180;
    xRay.value = Math.round(xOrigin + Math.cos(radians) * height);
    yRay.value = Math.round(yOrigin + Math.sin(radians) * height);
    const hitPoint = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xOrigin, y: yOrigin });
    const incomingVector: Vector2 = { x: xRay.value - hitPoint.x, y: yRay.value - hitPoint.y };
    const normalizedVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    const reflectedVector = reflect(incomingVector, normalizedVector);

    path.moveTo(xOrigin, yOrigin);
    path.lineTo(xRay.value, yRay.value);
    path.moveTo(hitPoint.x, hitPoint.y);
    path.lineTo(reflectedVector.x * height, reflectedVector.y * height);
  });

  return (
    <Canvas style={{ flex: 1, width: '100%', height: '100%' }}>
      <Path path={clip} color="lightblue" style="stroke" />
    </Canvas>
  );
};
export default ReflectionSkia;
