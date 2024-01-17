import { Layout } from '../layout';
import { VectorReflection } from '../components/Reflection';
import { BackButton } from '../components/BackButton';

export const VectorReflectionScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <VectorReflection />
    </Layout>
  );
};
