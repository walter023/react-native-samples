import { lerp, intersectionPoint } from './index.ts';

describe('lerp', () => {
  test('The linear interpolation of 0 and 1 at 0.5 is 0.5', () => {
    expect(lerp(0, 1, 0.5)).toBe(0.5);
  });

  test('The linear interpolation of 0 and 1 at 0.75 is 0.75', () => {
    expect(lerp(0, 1, 0.75)).toBe(0.75);
  });
});

describe('intersectionPoint', () => {
  const ORIGIN = { x: 0, y: 0 };
  const RESOLUTION = { x: 100, y: 100 };
  test('The intersection point of a vector with origin (0, 0) and resolution (100, 100) is (100, 100)', () => {
    const INCOMING_VECTOR = { x: 100, y: 100 };
    const RESULT = { x: 100, y: 100 };
    expect(intersectionPoint(INCOMING_VECTOR, ORIGIN, RESOLUTION)).toEqual(RESULT);
  });

  test('The intersection point of a vector with origin (0, 0) and resolution (100, 100) is (0, 0)', () => {
    const INCOMING_VECTOR = { x: -100, y: -100 };
    const RESULT = { x: 0, y: 0 };
    expect(intersectionPoint(INCOMING_VECTOR, ORIGIN, RESOLUTION)).toEqual(RESULT);
  });
});
