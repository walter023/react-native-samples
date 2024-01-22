import { Skia, Canvas, Shader, Fill, vec, useClock } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float  iTime;    

vec4 main(vec2 pos) {
  vec2 uv = pos / iResolution;
  uv = uv * 2 - 1;
  uv.x *= iResolution.x / iResolution.y;
  
  float d = length(uv);
  d = sin(d * 12 + iTime * 0.002) / 12;
  d = abs(d);

  d = 0.002 / d; 

  vec3 redColor = vec3(1, 0, 0);

  redColor *= d;
  return vec4(redColor, 1);
}`)!;

export const Rings = () => {
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
