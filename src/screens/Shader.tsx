import { Layout } from '../layout';
import { BackButton } from '../components/BackButton';
import { Rings } from '../components/Shader';

export const ShaderScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <Rings />
    </Layout>
  );
};
