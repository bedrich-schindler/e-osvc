import { nativeImage } from 'electron';
import path from 'path';

export const getIcon = (icon) => nativeImage
  .createFromPath(path.join(__dirname, `../../public/images/icons/${icon}.png`))
  .resize({
    height: 24,
    width: 24,
  });
