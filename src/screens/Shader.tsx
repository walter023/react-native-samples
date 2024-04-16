import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import Fractal from '../components/Fractal/index.tsx';

const ShaderScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <Fractal />
  </Layout>
);

export default ShaderScreen;
