import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import DistShader from '../components/Dist/index.tsx';

const CircleShaderScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <DistShader />
  </Layout>
);

export default CircleShaderScreen;
