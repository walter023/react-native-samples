import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

// https://iquilezles.org/articles/palettes/
vec3 palette( in float t )
{
    vec3 a =  vec3 (0.618, 0.658,0.500);
    vec3 b =  vec3 (-0.082, 0.500, -0.452);
    vec3 c =  vec3 (1.000, 1.000, 1.000);
    vec3 d =  vec3 (0.000, 0.333, 0.667);
    return a + b*cos( 6.28318*(c*t+d) );
} 

https://www.youtube.com/watch?v=PMltMdi1Wzg
float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

vec4 main( vec2 pos ) {
  vec2 uv = pos / iResolution;
  uv = uv * 2 - 1;
  uv.x *= iResolution.x / iResolution.y;

  float d = sdSegment(uv, vec2(0, -0.2), vec2(0, 0.2));

  vec3 col = palette(d+iTime * 0.002);
  d = sin(d * 10 + iTime * 0.002) / 10;
  d = abs(d);

  d = 0.009 / d; 
  col *= d;
  return vec4(col, 1);

}`)!;

const Rings = () => {
  const { height, width } = useWindowDimensions();
  const iResolution = vec(width, height);
  const clock = useClock();
  const uniforms = useDerivedValue(() => ({ iResolution, iTime: clock.value }), [clock]);

  return (
    <Canvas style={{ flex: 1, width, height, position: 'absolute' }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default Rings;
