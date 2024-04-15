import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

mat2 rot2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}
float random(vec2 st) {
  return fract(sin(dot(st.xy,    vec2(12.9898,78.233)))
  * 43758.5453123 + iTime * .0003);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}
vec4 main( vec2 fragCoord ) {
  vec2 uv = fragCoord / iResolution.xy;
  //uv.x *= iResolution.x / iResolution.y;
  vec2 pos = vec2(uv * 6.0);
  
  vec3 colorA = vec3(0.12,0.0157,0.143);
  vec3 colorB = vec3(1.0,0.333,0.224);

  pos *= rot2D(iTime * .0002);

  float n = 0.12 / noise(pos);
  vec3 finalColor = vec3(0.0);   // top-right
  finalColor = mix(colorA, colorB, n);


  return vec4(finalColor, 1);
}`)!;

const Texture = () => {
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

export default Texture;
