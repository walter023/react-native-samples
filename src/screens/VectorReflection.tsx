import React from 'react';
import Layout from '../layout/index.tsx';
import VectorReflection from '../components/Reflection/ReflectionSVG.tsx';
import BackButton from '../components/BackButton/index.tsx';

const VectorReflectionScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <VectorReflection />
  </Layout>
);

export default VectorReflectionScreen;
