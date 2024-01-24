import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const isAndroid = Platform.OS !== 'ios';

/**
 * p0 + (p1 - p0) * t === p0 + (p1*t + p0*t) === (1-t)*p0 + t*p1
 * @param {startPoint} p0 - Starting point.
 * @param {endPoint} p1 - Ending point.
 * @param {t} t -The parameter t moves from 0 to 1 e.g 0.15
 * @returns  The new interpolation point for x and y  */
export const lerp = (startPoint: number, endPoint: number, t: number): number => {
  'worklet';

  return startPoint + (endPoint - startPoint) * t;
};
