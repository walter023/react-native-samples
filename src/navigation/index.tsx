import React, { useState } from 'react';
import { Screens } from '../constants/index.ts';
import HomeScreen from '../screens/Home.tsx';
import BezierCurveScreen from '../screens/BezierCurve.tsx';
import VectorReflectionScreen from '../screens/VectorReflection.tsx';
import RopeEffectScreen from '../screens/RopeEffect.tsx';
import ShaderScreen from '../screens/Shader.tsx';

const templateScreen: { [key: string]: React.JSX.Element } = {
  [Screens.HOME]: <HomeScreen />,
  [Screens.BEZIER_CURVE]: <BezierCurveScreen />,
  [Screens.VECTOR_REFLECTION]: <VectorReflectionScreen />,
  [Screens.ROPE_EFFECT]: <RopeEffectScreen />,
  [Screens.SHADER]: <ShaderScreen />,
};

export const NavigationContext = React.createContext({
  currentScreen: Screens.HOME,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigate: (screen: string) => {},
  back: () => {},
});

export const ContextNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<string>(Screens.HOME);

  const navigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        back: () => setCurrentScreen(Screens.HOME),
      }}
    >
      {templateScreen[currentScreen]}
    </NavigationContext.Provider>
  );
};
