import React, { useEffect, useRef } from 'react';
import Svg, { Path, PathProps, Circle } from 'react-native-svg';
import { useColorScheme, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedProps, useDerivedValue } from 'react-native-reanimated';

import { intersectionPoint, reflect } from '../../helpers/index.ts';
import { Vector2 } from '../../../types.ts';
import { Colors, ANGLE, DURATION, BOUNCES } from '../../constants/index.ts';
import * as theme from '../../theme.ts';

const VectorReflection: React.FC = () => {
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

  const path = useDerivedValue(() => {
    const resolution = { x: width, y: height };
    let radians = (angle.value * Math.PI) / 180;
    xRay.value = Math.round(xOrigin + Math.cos(radians) * height);
    yRay.value = Math.round(yOrigin + Math.sin(radians) * height);
    let hitPoint = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xOrigin, y: yOrigin }, resolution);
    const incomingVector: Vector2 = { x: xRay.value - hitPoint.x, y: yRay.value - hitPoint.y };
    let normalizedVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    let reflectedVector = reflect(incomingVector, normalizedVector);
    let reflectionPath = `M${hitPoint.x},${hitPoint.y}L${reflectedVector.x * height},${reflectedVector.y * height}`;

    let x: number;
    let y: number;
    for (let i = 0; i < BOUNCES; i += 1) {
      radians = Math.atan2(reflectedVector.y, reflectedVector.x);
      x = Math.round(hitPoint.x + Math.cos(radians) * height);
      y = Math.round(hitPoint.y + Math.sin(radians) * height);
      hitPoint = intersectionPoint({ x, y }, hitPoint, resolution);
      normalizedVector = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
      reflectedVector = reflect(reflectedVector, normalizedVector);
      reflectionPath += `L${hitPoint.x},${hitPoint.y} L${reflectedVector.x * height},${reflectedVector.y * height}`;
    }

    return `M${xOrigin},${yOrigin} L${xRay.value},${yRay.value}${reflectionPath}`;
  }, [angle.value]);

  const laserEffectPath = useAnimatedProps(
    () => ({
      d: path.value,
      strokeDashoffset: ((Date.now() - initialTime.current) / 1000) * -loop.value,
    }),
    [path, loop],
  );

  const animatedRayPath = useAnimatedProps(() => ({ d: path.value }));

  return (
    <>
      <Svg height={height} width={width}>
        <AnimatedPath animatedProps={animatedRayPath} fill="none" strokeWidth={2} stroke={Colors.RED} />
        <AnimatedPath
          animatedProps={laserEffectPath}
          stroke={theme.home(isDarkMode).listItemBg}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={[40, 15]}
        />
        <Circle cx={xOrigin} cy={yOrigin} r="30" fill={Colors.VIVID_ORANGE} />
      </Svg>
    </>
  );
};

export default VectorReflection;
