import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

vec3 palette(in float t) {
  vec3 a = vec3(0.618, 0.658, 0.500);
  vec3 b = vec3(-0.082, 0.500, -0.452);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b * cos(6.28318 * (c * t + d));
}

vec2 setCamera(vec2 uv) {
  float rad = -2.1;
  uv = mat2(cos(rad), sin(rad), -sin(rad), cos(rad)) * uv;
  uv += vec2(4.5, 21.7);
  return uv *= .0289;
}

// Zn² + C
vec2 Mandelbrot(vec2 uv, vec2 z) {
  float zr = z.x * z.x - z.y * z.y;
  float zi = 2.0 * z.x * z.y;
  return vec2(zr, zi) + uv;
}


vec4 main( vec2 fragCoord ) {
  vec2 uv = fragCoord / iResolution; 
  uv = uv * 2 - 1; 
  uv.x *= iResolution.x / iResolution.y; 

  vec2 uv0 = uv;
  int MAX_INDEX = 250;
  float MAX_MAGNITUDE = 2.0;
  bool isBounded = true;
  uv0.x -= .05;
  uv0.y += .012;
  float d = (length(uv0) - 0.005) * 0.08;

  uv = setCamera(uv);

  vec2 z = uv;
  vec3 finalColor = palette(0.005 / d + iTime * 0.0002);
  for(int i = 0; i < 150; i++) {
    if(length(z) > MAX_MAGNITUDE) {
      isBounded = false;
      break;
    }
    z = Mandelbrot(uv, z);
  }

  if(!isBounded)
    finalColor = vec3(0.04);

  return vec4(finalColor, 1);
}`)!;

const LoveHole = () => {
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

export default LoveHole;
