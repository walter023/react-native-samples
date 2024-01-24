import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Layout from '../layout/index.tsx';
import Beziercurve from '../components/BezierCurve/index.tsx';
import BackButton from '../components/BackButton/index.tsx';

const BezierCurveScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <GestureHandlerRootView>
      <Beziercurve />
    </GestureHandlerRootView>
  </Layout>
);
export default BezierCurveScreen;
