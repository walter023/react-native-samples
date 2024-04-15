import React from 'react';
import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;   

vec2 rotate2D(vec2 st, float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a)) * st;
}

// https://iquilezles.org/articles/palettes/
vec3 palette( in float t ){
    vec3 a =  vec3 (.26,.76,.77);
    vec3 b =  vec3 (1,.3,1);
    vec3 c =  vec3 (.8,.4,.7);
    vec3 d =  vec3 (0,.12,.54);
    return a + b*cos( 6.28318*(c*t+d) );
} 

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// https://www.shadertoy.com/view/4djSRW
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

////////////////////////
float dot2(in vec2 v) {
  return dot(v, v);
}

//iquilezles thanks :)
float sdHeart(in vec2 p) {
  p.x = abs(p.x);

  if(p.y + p.x > 1.0)
    return sqrt(dot2(p - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
  return sqrt(min(dot2(p - vec2(0.00, 1.00)), dot2(p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
}

float st(float a, float b, float s) //AA bar
{
  return smoothstep(a - s, a + s, b);
}

float noise(in vec2 p) //gradient noise
{
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (2.5 - 2. * f);
  return mix(mix(dot(hash22(i + vec2(0, 0)), f - vec2(0, 0)), dot(hash22(i + vec2(1, 0)), f - vec2(1, 0)), u.x), mix(dot(hash22(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash22(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}

vec4 main( vec2 fragCoord ) {
  vec2 r =( iResolution.xy / 3.5) , uv = (fragCoord * 3. - r ) / r.y, id, lc, t;
  uv.y -=  7.6; // move the heart down
  uv *= -1.; //scale the heart
  vec3 f, c;
  float xd, yd, h;
  float sm = 3.0 / r.y; //smoothness factor for AA
  yd = 40.; //number of rings 
  id = vec2(sdHeart(uv) * yd, 0.0); //ring index  
  xd = floor(id.x) * .5; //number of ring segments
  h = iTime * .0002;  //ring shift

  
  t = rotate2D(uv, h);
  
  id.y = atan(t.y, t.x) * xd;
 
  lc = fract(id); //segment local coordinates
  id -= lc; // remove the local coordinates from the ring index
  lc *= (noise(lc * vec2(1, 1) + id)) * vec2(1.0); //add fine noise.
 
  f = mix(palette(sin(sdHeart(uv))), //sky background
  palette(sin(sdHeart(uv) - .2) + (hash12(id) - .3) * .3), //mix sky color
  st(abs(lc.x - .3), .1, sm * yd) * st(abs(lc.y), 1.0, sm * xd));
  return vec4(f, 1);
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
