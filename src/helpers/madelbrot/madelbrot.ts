import { glsl } from '../tags.ts';
import type { Type } from './base.ts';

export const corner: Type = glsl`
vec2 setCamera(vec2 uv) {
  float rad = -2.1;
  uv = mat2(cos(rad), sin(rad), -sin(rad), cos(rad)) * uv;
  uv += vec2(4.5, 21.74);
  return uv *= .0289;
}

vec4 main( vec2 fragCoord ) {
  vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
  float d = (length(uv) - 0.005) * 0.08;
  uv = setCamera(uv);
  vec2 z = uv;
  vec3 finalColor = palette(0.005 / d + iTime * 0.0002);
  for(int i = 0; i < 150; i++) {
    if(length(z) > maxIndex) {
      finalColor = vec3(0.04);
      break;
    }
    z = Mandelbrot(uv, z);
  }
  return vec4(finalColor, 1);
}
`;

export const zoom: Type = glsl`
vec2 setCamera(vec2 uv) {
  float rad = sin(iTime * .0002) * 2.1;
  float s = sin(rad);
  float c = cos(rad);
  uv = mat2(c, -s, s, c) * uv;
  uv -= vec2(5.403, 0.0);
  return uv * .31;
}

vec4 main( vec2 fragCoord ) {
  vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
  uv = scale(vec2(sin(iTime * .0002) + 1.0)) * uv;
  uv = setCamera(uv);
  vec3 finalColor = vec3(0);
  vec2 z = uv;
  float d = (length(uv));
  for(float i = 0.0; i < maxIndex; i++) {
    finalColor = palette(0.0005 / d + iTime * .0001 + i * .4);
    red += 0.025;
    if(length(z) > threshold) {
      finalColor = vec3(red, 0, 0);
      break;
    }
    z = Mandelbrot(uv, z);
  }
  return vec4(finalColor, 1);
}

`;
