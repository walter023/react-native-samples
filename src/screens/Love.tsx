import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import { Transitions } from '../components/Shader/Texture.tsx';

const LoveHoleScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Transitions />
    </GestureHandlerRootView>
  </Layout>
);

export default LoveHoleScreen;
