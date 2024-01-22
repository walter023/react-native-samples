import { Skia, Canvas, Shader, Fill, vec } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;  

vec4 main(vec2 pos) {
 vec2 uv = pos / iResolution;


 uv = uv * 2 - 1;

 return vec4(uv.x, uv.y, 0.0, 1);
}`)!;

export const TryppyShader = () => {
  const { height, width } = useWindowDimensions();
  const iResolution = vec(width, height);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={source} uniforms={{ iResolution }} />
      </Fill>
    </Canvas>
  );
};
