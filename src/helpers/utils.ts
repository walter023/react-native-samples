import { Platform } from 'react-native';
import { SkImage } from '@shopify/react-native-skia';
import { Points, Vector2 } from '../../types.ts';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS !== 'ios';

/*
 // Example usage:
const arr = [1, 2, 3, 4, 5];
console.log(getElementAtIndex(arr, 7)); // Output: 2
console.log(getElementAtIndex(arr, -2)); // Output: 3
console.log(((7 % 5)+ 5) % 5);
console.log(((-2 % 5)+ 5) % 5);
*/

export const getElementAtIndex = <T extends SkImage>(array: T[], index: number) => {
  'worklet';

  if (!array) return null;
  if (array.length === 0) {
    throw new Error('Array is empty.');
  }
  return array[((index % array.length) + array.length) % array.length];
};

export const snapPoint = (value: number, velocity: number, points: ReadonlyArray<number>): number => {
  'worklet';

  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter(p => Math.abs(point - p) === minDelta)[0];
};

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

/*
 * Calculate the hit point of the screen's edge, using the slope-intercept form of a line:
 * y = mx + b
 * b = y - mx
 * b = yOrigin - m * xOrigin
 * y = mx + b
 * y = mx + yOrigin - m * xOrigin.
 * y = m * (x - xOrigin) + yOrigin,
 * y = slope * (xEdge - xOrigin) + yOrigin,
 * xEdge is the x-coordinate of the edge point. xEdge = (edge === 'right') ? width : 0;.
 */
export const intersectionPoint = <T extends Vector2>(incomingVector: T, origin: T, resolution: T): Vector2 => {
  'worklet';

  const vector = { x: incomingVector.x - origin.x, y: incomingVector.y - origin.y };
  const slope = vector.y / vector.x;
  const xEdge = vector.x > 0 ? resolution.x : 0;
  const yEdge = slope * (xEdge - origin.x) + origin.y;
  let hitPoint = { x: xEdge, y: yEdge };
  //  vertical case
  if (yEdge > resolution.y || yEdge < 0) {
    hitPoint = { x: origin.x - origin.y / slope, y: 0 };
  }
  return { x: Math.round(hitPoint.x), y: Math.round(hitPoint.y) };
};

export const reflect = <T extends Vector2>(incomingVector: T, normalVector: T): Vector2 => {
  'worklet';

  const scalarProjection = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
  return {
    x: incomingVector.x - 2 * scalarProjection * normalVector.x,
    y: incomingVector.y - 2 * scalarProjection * normalVector.y,
  };
};

export const getPointState = (width: number, height: number): Points => {
  const points = {
    p0: {
      x: 20,
      y: height / 2,
    },
    p1: {
      x: width / 2,
      y: 70,
    },
    p2: {
      x: width - 30,
      y: height / 2,
    },
  };
  return points;
};
