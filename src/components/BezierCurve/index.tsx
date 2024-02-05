import React, { Fragment, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Points as PointsPros } from '../../../types.ts';
import { ControlPointsInitState } from '../../models/index.ts';
import { Colors, R, BEZIER_DURATION } from '../../constants/index.ts';
import { lerp } from '../../helpers/index.ts';
import ControlPoint from './ControlPoint.tsx';

const Beziercurve: React.FC = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const { width, height } = useWindowDimensions();
  const ctrlPoints = useSharedValue<PointsPros>(ControlPointsInitState);

  const sideAX = useSharedValue<number>(ControlPointsInitState.p1.x);
  const sideAY = useSharedValue<number>(ControlPointsInitState.p1.y);

  const sideBX = useSharedValue<number>(ControlPointsInitState.p2.x);
  const sideBY = useSharedValue<number>(ControlPointsInitState.p2.y);

  const bezierT = useSharedValue<number>(0);
  const bezeirX = useSharedValue<number>(sideBX.value);
  const bezeirY = useSharedValue<number>(sideBY.value);

  const setCtrlPointPosition = (point: PointsPros): void => {
    if (point) {
      const newState = { ...ctrlPoints.value, ...point };
      ctrlPoints.value = newState;
      // initial positions
      sideAX.value = ctrlPoints.value.p1.x;
      sideAY.value = ctrlPoints.value.p1.y;
      sideBX.value = ctrlPoints.value.p2.x;
      sideBY.value = ctrlPoints.value.p2.y;
      bezeirX.value = sideBX.value;
      bezeirY.value = sideBY.value;
      bezierT.value = 0;
      runOnJS(runInterpolation)();
    }
  };

  const runInterpolation = () => {
    sideAX.value = withRepeat(withTiming(ctrlPoints.value.p0.x, BEZIER_DURATION), -1, true);
    sideAY.value = withRepeat(withTiming(ctrlPoints.value.p0.y, BEZIER_DURATION), -1, true);
    sideBX.value = withRepeat(withTiming(ctrlPoints.value.p1.x, BEZIER_DURATION), -1, true);
    sideBY.value = withRepeat(withTiming(ctrlPoints.value.p1.y, BEZIER_DURATION), -1, true);
    bezierT.value = withRepeat(withTiming(1, BEZIER_DURATION), -1, true);
  };

  useEffect(() => {
    runInterpolation();
  });

  useDerivedValue(() => {
    const x1 = sideBX.value;
    const y1 = sideBY.value;
    const x2 = sideAX.value;
    const y2 = sideAY.value;
    bezeirX.value = lerp(x1, x2, bezierT.value);
    bezeirY.value = lerp(y1, y2, bezierT.value);
  }, [bezierT, sideAX, sideAY, sideBX, sideBY]);

  const triangulePath = useAnimatedProps(() => {
    const starts = `${ctrlPoints.value.p0.x + R} ${ctrlPoints.value.p0.y + R}`;
    const sideA = `${ctrlPoints.value.p1.x + R} ${ctrlPoints.value.p1.y + R}`;
    const sideB = `${ctrlPoints.value.p2.x + R} ${ctrlPoints.value.p2.y + R}`;
    return {
      d: `M${starts}L${sideA}L${sideB}`,
    };
  });

  const connectorPath = useAnimatedProps(() => {
    const lineStarts = `${sideAX.value + R} ${sideAY.value + R}`;
    const lineEnds = `${sideBX.value + R} ${sideBY.value + R}`;
    return { d: `M${lineStarts}L${lineEnds}` };
  });

  const bezierCurvePath = useAnimatedProps(() => {
    const curveStarts = `${bezeirX.value + R} ${bezeirY.value + R}`;
    const curvePositionAndDepth = `${sideAX.value + R} ${sideAY.value + R}`;
    const curveEnds = `${ctrlPoints.value.p0.x + R}  ${ctrlPoints.value.p0.y + R}`;
    return { d: `M${curveStarts} Q${curvePositionAndDepth} ${curveEnds}` };
  });

  const ballSideA = useAnimatedStyle(() => ({
    transform: [{ translateX: sideAX.value }, { translateY: sideAY.value }],
  }));

  const ballSideB = useAnimatedStyle(() => ({
    transform: [{ translateX: sideBX.value }, { translateY: sideBY.value }],
  }));

  const bezierBall = useAnimatedStyle(() => ({
    transform: [{ translateX: bezeirX.value }, { translateY: bezeirY.value }],
  }));
  return (
    <View style={styles.container}>
      <ControlPoint setCtrlPointPosition={setCtrlPointPosition} style={styles.p0} position={ctrlPoints.value.p0} id="p0" />
      <ControlPoint setCtrlPointPosition={setCtrlPointPosition} style={styles.p1} position={ctrlPoints.value.p1} id="p1" />
      <ControlPoint setCtrlPointPosition={setCtrlPointPosition} style={styles.p2} position={ctrlPoints.value.p2} id="p2" />
      <Svg width={width} height={height} style={styles.canvas}>
        <AnimatedPath animatedProps={triangulePath} fill="none" strokeWidth={2} stroke={Colors.RED} />
        <AnimatedPath animatedProps={connectorPath} fill="none" strokeWidth={2} stroke={Colors.RED} />
        <AnimatedPath animatedProps={bezierCurvePath} fill="none" strokeWidth={4} stroke={Colors.CYAN} />
      </Svg>
      <Fragment>
        <Animated.View style={[styles.l1, ballSideA]} />
        <Animated.View style={[styles.l2, ballSideB]} />
        <Animated.View style={[styles.p, bezierBall]} />
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  p0: {
    backgroundColor: Colors.SOFT_RED,
    left: -5,
    zIndex: 1,
    borderRadius: R * 2,
  },
  p1: {
    backgroundColor: Colors.SOFT_BLUE,
    left: -5,
    zIndex: 1,
    borderRadius: R * 2,
  },
  p2: {
    backgroundColor: Colors.GREEN,
    left: -5,
    zIndex: 1,
    borderRadius: R * 2,
  },
  p: {
    width: 20,
    height: 20,
    borderRadius: R,
    backgroundColor: Colors.CYAN,
    position: 'absolute',
    zIndex: 1,
  },
  canvas: {
    zIndex: -1,
  },
  l1: {
    width: 20,
    height: 20,
    borderRadius: R,
    backgroundColor: 'violet',
    position: 'absolute',
  },
  l2: {
    width: 20,
    height: 20,
    borderRadius: R,
    backgroundColor: 'green',
    position: 'absolute',
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: R,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'oreange',
    borderColor: 'oreange',
    borderWidth: 1,
    marginTop: 20,
  },
  text: {
    zIndex: 100,
  },
});

export default Beziercurve;
