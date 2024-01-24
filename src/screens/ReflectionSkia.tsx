import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import ReflectionSkia from '../components/Reflection/ReflectionSkia.tsx';

const ReflectionSkiaScreen: React.FC = () => (
  <Layout>
    <ReflectionSkia />
    <BackButton />
  </Layout>
);

export default ReflectionSkiaScreen;
