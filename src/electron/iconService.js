import { nativeImage } from 'electron';

export const getIcon = (icon) => nativeImage
  .createFromPath(`./public/images/icons/${icon}.png`)
  .resize({
    height: 24,
    width: 24,
  });
