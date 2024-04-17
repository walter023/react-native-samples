/* eslint-disable global-require */
import { useImage } from '@shopify/react-native-skia';

// eslint-disable-next-line import/prefer-default-export
export const useAssets = () => {
  const image1 = useImage(require('../assets/transitions/1.jpg'));
  const image2 = useImage(require('../assets/transitions/2.jpg'));
  const image3 = useImage(require('../assets/transitions/3.jpg'));
  const image4 = useImage(require('../assets/transitions/4.jpg'));
  const image5 = useImage(require('../assets/transitions/5.jpg'));
  const image6 = useImage(require('../assets/transitions/6.jpg'));
  const image7 = useImage(require('../assets/transitions/7.jpg'));
  if (!image1 || !image2 || !image3 || !image4 || !image5 || !image6 || !image7) {
    return null;
  }
  return [image1, image2, image3, image4, image5, image6, image7];
};
