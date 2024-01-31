import { Canvas, Fill, Shader, Skia, useClock, vec } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

// https://iquilezles.org/articles/palettes/
vec3 palette( in float t ){
    vec3 a =  vec3 (0.768, 0.518, 0.528);
    vec3 b =  vec3 (0.414, 0.200, 0.310);
    vec3 c =  vec3 (0.901, 0.546, 0.862);
    vec3 d =  vec3 (0.007, 0.333, 0.667);
    return a + b*cos( 6.28318*(c*t+d) );
} 

vec4 main( vec2 pos ) {
  vec2 uv = pos / iResolution; 
  uv = uv * 2 - 1; 
  uv.x *= iResolution.x / iResolution.y; 
  float time =  iTime * 0.001;
  vec3 finalColor = vec3(0);

  for (float i = 0.0; i < 25.0; i++) {
    float c = cos(time + i) * 0.3;
    float s = sin(time + i) * 0.3;
    float d = abs(uv.x + c);
    float e = abs(uv.y + s);
    float h = 0.00007/(d * e);
    vec3 col = palette(uv.x + uv.y + time + i * .25);
    finalColor += col *= h;
  }
  return vec4( finalColor, 1.0);
}`)!;

const CircleShader: React.FC = () => {
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

export default CircleShader;
