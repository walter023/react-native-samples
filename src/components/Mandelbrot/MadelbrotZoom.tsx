import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
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

vec2 setCamera(vec2 uv) {
  float rad = sin(iTime * .0002) * 2.1;
  float s = sin(rad);
  float c = cos(rad);
  uv = mat2(c, -s, s, c) * uv;
  uv -= vec2(5.403, 0.0);
  return uv * .31;
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
}`)!;

const MandelbrotZoom = () => {
  const { height, width } = useWindowDimensions();
  const iResolution = vec(width, height);
  const clock = useClock();
  const uniforms = useDerivedValue(() => ({ iResolution, iTime: clock.value }), [clock]);

  return (
    <Canvas style={{ ...styles.container, height, width }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
});

export default MandelbrotZoom;
