import { useEffect, useRef } from 'react';
import Svg, { Path, PathProps, Circle } from 'react-native-svg';
import { useColorScheme, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedProps, useDerivedValue } from 'react-native-reanimated';

import { Vector2 } from '../../../types';
import { Color, ANGLE, DURATION, BOUNCES } from '../../constants';
import * as theme from '../../theme';

export const VectorReflection: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const initialTime = useRef(Date.now());
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yOrigin = height / 1.2;
  const xOrigin = width / 2;
  const xRay = useSharedValue<number>(0);
  const yRay = useSharedValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const loop = useSharedValue<number>(0);
  const AnimatedPath = Animated.createAnimatedComponent<PathProps>(Path);

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
    loop.value = withRepeat(withTiming(100), -1, false);
  });

  /*
   * Calculate the hit point of the screen's edge, using the slope-intercept form of a line:
   * y = mx + b
   * yOrigin = m * xOrigin + b
   * b = y - mx
   * b = yOrigin - m * xOrigin
   * y = mx + b
   * y = mx + yOrigin - m * xOrigin.
   * y = m * (x - xOrigin) + yOrigin,
   * y = slope * (xEdge - xOrigin) + yOrigin,
   * xEdge is the x-coordinate of the edge point. xEdge = (edge === 'right') ? width : 0;.
   */
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
    const dotProduct = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
    return {
      x: incomingVector.x - 2 * dotProduct * normalVector.x,
      y: incomingVector.y - 2 * dotProduct * normalVector.y,
    };
  };

  const path = useDerivedValue(() => {
    let radians = (angle.value * Math.PI) / 180;
    xRay.value = Math.round(xOrigin + Math.cos(radians) * height);
    yRay.value = Math.round(yOrigin + Math.sin(radians) * height);
    let hitPoint = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xOrigin, y: yOrigin });
    const incomingVector: Vector2 = { x: xRay.value - hitPoint.x, y: yRay.value - hitPoint.y };
    let normalizedVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    let reflectedVector = reflect(incomingVector, normalizedVector);
    let path = `M${hitPoint.x},${hitPoint.y}L${reflectedVector.x * height},${reflectedVector.y * height}`;

    let x, y;
    for (let i = 0; i < BOUNCES; i++) {
      radians = Math.atan2(reflectedVector.y, reflectedVector.x);
      x = Math.round(hitPoint.x + Math.cos(radians) * height);
      y = Math.round(hitPoint.y + Math.sin(radians) * height);
      hitPoint = intersectionPoint({ x, y }, hitPoint);
      normalizedVector = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
      reflectedVector = reflect(reflectedVector, normalizedVector);
      path += `L${hitPoint.x},${hitPoint.y} L${reflectedVector.x * height},${reflectedVector.y * height}`;
    }

    return `M${xOrigin},${yOrigin} L${xRay.value},${yRay.value}${path}`;
  }, [angle.value]);

  const animatedRayPath = useAnimatedProps(() => {
    return { d: path.value };
  });

  const laserEffectPath = useAnimatedProps(() => {
    return {
      d: path.value,
      strokeDashoffset: ((Date.now() - initialTime.current) / 1000) * -loop.value,
    };
  }, [path, loop]);

  return (
    <>
      <Svg height={height} width={width}>
        <AnimatedPath animatedProps={animatedRayPath} fill="none" strokeWidth={2} stroke={Color.RED} />
        <AnimatedPath
          animatedProps={laserEffectPath}
          stroke={theme.home(isDarkMode).listItemBg}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={[40, 15]}
        />
        <Circle cx={xOrigin} cy={yOrigin} r="30" fill={Color.VIVID_ORANGE} />
      </Svg>
    </>
  );
};
