import React from 'react';
import { Layout } from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import { Rings } from '../components/Shader/index.tsx';

const ShaderScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <Rings />
  </Layout>
);

export default ShaderScreen;
