import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Layout from '../layout/index.tsx';
import BackButton from '../components/BackButton/index.tsx';
import { Transitions } from '../components/Shader/Texture.tsx';

const LoveHoleScreen: React.FC = () => (
  <Layout>
    <BackButton />
    <GestureHandlerRootView style={styles.gesture}>
      <Transitions />
    </GestureHandlerRootView>
  </Layout>
);

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});
export default LoveHoleScreen;
