import { lerp } from './index.ts';

describe('lerp', () => {
  test('The linear interpolation of 0 and 1 at 0.5 is 0.5', () => {
    expect(lerp(0, 1, 0.5)).toBe(0.5);
  });

  test('The linear interpolation of 0 and 1 at 0.75 is 0.75', () => {
    expect(lerp(0, 1, 0.75)).toBe(0.75);
  });
});
