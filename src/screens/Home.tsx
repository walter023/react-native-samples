import React from 'react';
import Layout from '../layout/index.tsx';
import ListView from '../components/List/ListView.tsx';
import { DATA } from '../models/index.ts';

const HomeScreen: React.FC = () => (
  <Layout title="React Native Samples" slideInLeft={false}>
    <ListView listData={DATA} />
  </Layout>
);

export default HomeScreen;
