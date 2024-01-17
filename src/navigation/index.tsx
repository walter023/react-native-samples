import React, { useState } from 'react';
import { Screens } from '../constants';
import { HomeScreen } from '../screens/Home';
import { BezierCurveScreen } from '../screens/BezierCurve';

const templateScreen: { [key: string]: React.JSX.Element } = {
  [Screens.HOME]: <HomeScreen />,
  [Screens.BEZIER_CURVE]: <BezierCurveScreen />,
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
