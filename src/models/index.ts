import { Screens } from '../constants/index.ts';
import { ListType } from '../../types.ts';

export const DATA: ListType[] = [
  {
    name: 'Bézier curves',
    description: 'Some samples the usage of Bézier curves using reanimated & svg.',
    icon: 'bezierCurve',
    screenName: Screens.BEZIER_CURVE,
  },
  {
    name: 'Vector Reflection using Skia',
    description: 'Usage of vectors and vector projection using reanimated & skia.',
    icon: 'axis',
    screenName: Screens.VECTOR_REFLECTION_SKIA,
  },
  {
    name: 'Mandelbrot Zoom Out',
    description: 'Imaginary Numbers.',
    icon: 'madelbrot',
    screenName: Screens.MANDELBROT_ZOOM,
  },
  {
    name: 'Unit Circle',
    description: 'Funky unit circle using reanimated & skia.',
    icon: 'coord',
    screenName: Screens.CIRCLE_SHADER,
  },
  {
    name: 'Mandelbrot',
    description: 'Zoom into a Mandelbrot cornner and some fascinating neons.',
    icon: 'madelbrotZoom',
    screenName: Screens.MANDELBROT,
  },
  {
    name: 'Trippy Shader',
    description: 'Playing with shaders using reanimated, skia & glsl.',
    icon: 'circles',
    screenName: Screens.SHADER,
  },
  {
    name: 'Rope Effect',
    description: 'Some samples the usage of rope physics curves using reanimated & svg.',
    icon: 'length',
    screenName: Screens.ROPE_EFFECT,
  },
  {
    name: 'Love Hole',
    description: 'Another Shader.',
    icon: 'coord',
    screenName: Screens.LOVE_HOLE,
  },
];

export default DATA;
