import path from 'path';
// eslint-disable-next-line
import { nativeImage } from 'electron';

export const getIcon = (icon) => nativeImage
  .createFromPath(path.join(__dirname, `../../public/images/icons/${icon}.png`))
  .resize({
    height: 24,
    width: 24,
  });
