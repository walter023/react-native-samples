import React from 'react';
import Layout from '../layout/index.tsx';
import MandelbrotZoom from '../components/Mandelbrot/ReflectionSVG.tsx';
import BackButton from '../components/BackButton/index.tsx';

const MandelbrotZoomScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <MandelbrotZoom />
  </Layout>
);

export default MandelbrotZoomScreen;
