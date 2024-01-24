import { useWindowDimensions } from 'react-native';
import { Screens } from '../constants/index.ts';
import { ListType, Points } from '../../types.ts';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { width, height } = useWindowDimensions();

export const DATA: ListType[] = [
  {
    name: 'Bézier curves',
    description: 'Some samples the usage of Bézier curves using reanimated & svg.',
    icon: 'bezierCurve',
    screenName: Screens.BEZIER_CURVE,
  },
  {
    name: 'Vector Reflection With Skia',
    description: 'Some samples the usage of vectors, dot product, vector projection using reanimated & skia.',
    icon: 'turret',
    screenName: Screens.VECTOR_REFLECTION_SKIA,
  },
  {
    name: 'Shader (Rings)',
    description: 'Learning and playing with shaders using reanimated, skia & glsl.',
    icon: 'axis',
    screenName: Screens.SHADER,
  },
  {
    name: 'Vector Reflection with SVG',
    description: 'Some samples the usage of vectors, dot product, vector projection using reanimated & svg.',
    icon: 'turret',
    screenName: Screens.VECTOR_REFLECTION,
  },
  {
    name: 'Rope Effect',
    description: 'Some samples the usage of rope physics curves using reanimated & svg.',
    icon: 'length',
    screenName: Screens.ROPE_EFFECT,
  },
];

export const ControlPointsInitState: Points = {
  p0: {
    x: 20,
    y: height / 2,
  },
  p1: {
    x: width / 2,
    y: 20,
  },
  p2: {
    x: width - 20,
    y: height / 2,
  },
};
