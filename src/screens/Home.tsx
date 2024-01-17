import { Layout } from '../layout';
import { ListView } from '../components/List/ListView';
import { DATA } from '../models';

export const HomeScreen: React.FC = () => (
  <Layout title="React Native Samples" slideInLeft={false}>
      <ListView listData={DATA} />
  </Layout>
);
