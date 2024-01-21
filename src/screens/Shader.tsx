import { Layout } from '../layout';
import { BackButton } from '../components/BackButton';
import { TryppyShader } from '../components/Shader';

export const ShaderScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <TryppyShader />
    </Layout>
  );
};
