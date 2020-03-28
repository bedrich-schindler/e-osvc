import { STORAGE_PREFIX } from '../../config/config';

export const removeFromStorage = (key) => {
  sessionStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
};

export const retrieveFromStorage = (key) => {
  let data = sessionStorage.getItem(`${STORAGE_PREFIX}_${key}`);

  if (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  return data;
};

export const storeToStorage = (key, value) => {
  sessionStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
};
