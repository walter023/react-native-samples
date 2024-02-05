import { lerp, intersectionPoint, reflect } from './index.ts';

describe('lerp', () => {
  const FROM = 0;
  const TO = 1;

  test('The linear interpolation of 0 and 1 at 0.5 is 0.5', () => {
    const POS = 0.5;
    const RESULT = 0.5;
    expect(lerp(FROM, TO, POS)).toBe(RESULT);
  });

  test('The linear interpolation of 0 and 1 at 0.75 is 0.75', () => {
    const POS = 0.75;
    const RESULT = 0.75;
    expect(lerp(FROM, TO, POS)).toBe(RESULT);
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

describe('reflect', () => {
  test('The reflection of a vector with normal vector (1, 0) is (-1, 0)', () => {
    const INCOMING_VECTOR = { x: 1, y: 0 };
    const NORMAL_VECTOR = { x: 1, y: 0 };
    const RESULT = { x: -1, y: 0 };
    expect(reflect(INCOMING_VECTOR, NORMAL_VECTOR)).toEqual(RESULT);
  });

  test('The reflection of a vector with normal vector (0, 1) is (0, -1)', () => {
    const INCOMING_VECTOR = { x: 0, y: 1 };
    const NORMAL_VECTOR = { x: 0, y: 1 };
    const RESULT = { x: 0, y: -1 };
    expect(reflect(INCOMING_VECTOR, NORMAL_VECTOR)).toEqual(RESULT);
  });
});
