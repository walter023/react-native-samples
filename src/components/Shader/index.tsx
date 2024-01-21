import { Skia, Canvas, Shader, Fill } from '@shopify/react-native-skia';

const source = Skia.RuntimeEffect.Make(`
vec4 main(vec2 pos) {
  return vec4(0.0, 0.0, 0.0, 1);
}`)!;

export const TryppyShader = () => {
  return (
    <Canvas style={{ width: 256, height: 256 }}>
      <Fill>
        <Shader source={source} />
      </Fill>
    </Canvas>
  );
};
