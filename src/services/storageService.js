import { STORAGE_PREFIX } from '../../config/config';

export const removeFromStorage = (key) => {
  localStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
};

export const retrieveFromStorage = (key) => {
  let data = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);

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
  localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
};
