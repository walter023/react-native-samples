import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import LoveHole from '../components/Shader/Texture.tsx';

const LoveHoleScreen: React.FC = () => (
  <Layout>
    <LoveHole />
    <BackButton />
  </Layout>
);

export default LoveHoleScreen;
