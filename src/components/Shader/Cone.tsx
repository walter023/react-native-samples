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

float sdCone(vec3 p, vec2 c, float h) {
  float q = length(p.xz);
  return max(dot(c.xy, vec2(q, p.y)), -h - p.y);
}


vec4 main( vec2 pos ) {
  vec2 uv = pos / iResolution; 
  uv = uv * 2 - 1; 
  uv.x *= iResolution.x / iResolution.y; 
  float time =  iTime/ 600;
  vec3 finalColor = vec3(0);
  vec2 uv0 = uv;

 for(float i = .0; i < 2.0; i++) {
    uv = fract(uv * 12.0) - 0.5;
    //uv.y *= -1.0; // flip y
    float d = sdCone(vec3(uv, 0.0), vec2(1.0, 1.0), sin((length(uv) * length(uv0)) * 12.0 + time)) - 0.1;
    d = abs(d);
    d = pow(0.02 / d, 1.2);
    vec3 col = palette(length(uv) + time * 0.4 + i * 0.5);
    finalColor += col *= d;
  }
  return vec4(finalColor, 1);
}`)!;

const Cones = () => {
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

export default Cones;
