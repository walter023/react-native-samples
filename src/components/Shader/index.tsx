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
  d = sin(d * 12 + iTime) / 12;
  d = abs(d);
  d = smoothstep(0.00, 0.03, d);
  
  return vec4(d, d, d, 1);
}`)!;

export const TryppyShader = () => {
  const { height, width } = useWindowDimensions();
  const iResolution = vec(width, height);
  const clock = useClock();

  const uniforms = useDerivedValue(() => ({ iResolution, iTime: clock.value }), [clock]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

