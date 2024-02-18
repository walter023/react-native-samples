import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import Cones from '../components/Shader/Cone.tsx';

const RopeEffectScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <Cones />
  </Layout>
);

export default RopeEffectScreen;
