import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import CircleShader from '../components/Fractal/index.tsx';

const CircleShaderScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <CircleShader />
  </Layout>
);

export default CircleShaderScreen;
