/* eslint-disable indent */
import React from 'react';
import { IconProps, IconSize } from '../../../types.ts';
import { Icons } from './icons.ts';

const Icon: React.FC<IconProps> = props => {
  const { name, fill = 'black', size = IconSize.MD } = props;
  let { width = 0, height = 0 } = props;
  const renderIcon = Icons[name];

  if (!width && !height && size) {
    switch (size) {
      case IconSize.XXS:
        height = 12;
        width = 12;
        break;

      case IconSize.XS:
        height = 16;
        width = 16;
        break;

      case IconSize.SM:
        height = 24;
        width = 24;
        break;

      case IconSize.MD:
        height = 32;
        width = 32;
        break;

      case IconSize.LG:
        height = 60;
        width = 60;
        break;

      case IconSize.XLG:
        height = 80;
        width = 80;
        break;

      default:
        height = 44;
        width = 44;
        break;
    }
  }

  return renderIcon({ fill, width, height, ...props });
};
export default Icon;
