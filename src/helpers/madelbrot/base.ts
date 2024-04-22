import { frag } from '../tags.ts';

export type Type = string;

export const Madelbrot = (t: Type) => frag`
uniform vec2 iResolution;
uniform float  iTime;   
const float threshold = 4.0;
const float maxIndex = 150.0;
float red = 0.03;

vec3 palette(in float t) {
  vec3 a = vec3(0.618, 0.658, 0.500);
  vec3 b = vec3(-0.082, 0.500, -0.452);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b * cos(6.28318 * (c * t + d));
}

mat2 scale(vec2 by) {
  return mat2(by.x, 0.0, 0.0, by.y);
}

// Zn² + C
vec2 Mandelbrot(vec2 uv, vec2 z) {
  float zr = z.x * z.x - z.y * z.y;
  float zi = 2.0 * z.x * z.y;
  return vec2(zr, zi) + uv;
}
  
  ${t}
  
 `;
