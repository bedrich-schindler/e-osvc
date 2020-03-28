import {
  removeFromStorage,
  retrieveFromStorage,
  storeToStorage,
} from '../../services/storageService';

const TOKEN_KEY = 'token';

export const removeTokenFromStorage = () => removeFromStorage(TOKEN_KEY);
export const retrieveTokenFromStorage = () => retrieveFromStorage(TOKEN_KEY);
export const storeTokenToStorage = (token) => storeToStorage(TOKEN_KEY, token);
