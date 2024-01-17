import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Layout } from '../layout';
import { Beziercurve } from '../components/BezierCurve';
import { BackButton } from '../components/BackButton';

export const BezierCurveScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <GestureHandlerRootView>
        <Beziercurve />
      </GestureHandlerRootView>
    </Layout>
  );
};
