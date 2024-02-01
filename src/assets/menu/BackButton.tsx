import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BackButton: React.FC<SvgProps> = (props: SvgProps) => (
  <Svg viewBox="0 0 64 64" {...props}>
    <Path
      fill={props.fill}
      d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2zm6 50L18 32l20-20v40z"
    />
  </Svg>
);

export default BackButton;
