import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

// https://iquilezles.org/articles/palettes/
vec3 palette( in float t ){
    vec3 a =  vec3 (0.618, 0.658,0.500);
    vec3 b =  vec3 (-0.082, 0.500, -0.452);
    vec3 c =  vec3 (1.000, 1.000, 1.000);
    vec3 d =  vec3 (0.000, 0.333, 0.667); 
    return a + b*cos( 6.28318*(c*t+d) );
} 

vec4 main( vec2 pos ) {
  vec2 uv = pos / iResolution; 
  uv = uv * 2 - 1; 
  uv.x *= iResolution.x / iResolution.y; 
  float time =  iTime * 0.001;
  vec3 finalColor = vec3(0);
  for (float i = 0.0; i < 3.0; i++) {
    uv = fract(uv*3) - 0.5; 
    float d = length(uv); 
    vec3 col = palette(d + i*.7);
    d = sin(d * 10 + time ) / 10;
    d = abs(d);
    d = 0.008 / d; 
    finalColor += col *= d;
  }
  return vec4(finalColor, 1);
}`)!;

const Rings = () => {
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

export default Rings;
