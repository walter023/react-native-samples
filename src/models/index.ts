import { Screens } from '../constants';
import { ListType, Points } from '../../types';
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();

export const DATA: ListType[] = [
  {
    name: 'Bézier curves',
    description: 'Some samples the usage of Bézier curves using reanimated & svg.',
    icon: 'bezierCurve',
    screenName: Screens.BEZIER_CURVE,
  },
  {
    name: 'Vector Reflection',
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
  {
    name: 'Trippy Shader',
    description: 'Shader Sample description here',
    icon: 'axis',
    screenName: Screens.SHADER,
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
