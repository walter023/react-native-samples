import React from 'react';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import Mandelbrot from '../components/Shader/MandelbrotZoom.tsx';

const MandelbrotScreen: React.FC = () => (
  <Layout>
    <Mandelbrot />
    <BackButton />
  </Layout>
);

export default MandelbrotScreen;
