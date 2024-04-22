import React, { useState } from 'react';
import { Screens } from '../constants/index.ts';
import HomeScreen from '../screens/Home.tsx';
import BezierCurveScreen from '../screens/BezierCurve.tsx';
import MandelbrotZoomScreen from '../screens/MadelbrotZoom.tsx';
import ShaderScreen from '../screens/Shader.tsx';
import CircleShaderScreen from '../screens/CircleShader.tsx';
import ReflectionSkiaScreen from '../screens/ReflectionSkia.tsx';
import TransitionScreen from '../screens/Transition.tsx';
import MandelbrotScreen from '../screens/Mandelbrot.tsx';

type TemplateScreen = {
  [key in keyof typeof Screens]: React.JSX.Element;
};

const templateScreen: TemplateScreen = {
  HOME: <HomeScreen />,
  BEZIER_CURVE: <BezierCurveScreen />,
  MANDELBROT_ZOOM: <MandelbrotZoomScreen />,
  VECTOR_REFLECTION_SKIA: <ReflectionSkiaScreen />,
  SHADER: <ShaderScreen />,
  CIRCLE_SHADER: <CircleShaderScreen />,
  TRANSITIONS: <TransitionScreen />,
  MANDELBROT: <MandelbrotScreen />,
};

export const NavigationContext = React.createContext({
  currentScreen: Screens.HOME,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigate: (screen: keyof typeof Screens) => {},
  back: () => {},
});

export const ContextNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<keyof typeof Screens>('HOME');

  const navigate = (screen: keyof typeof Screens) => {
    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        back: () => setCurrentScreen('HOME'),
      }}
    >
      {templateScreen[currentScreen]}
    </NavigationContext.Provider>
  );
};
