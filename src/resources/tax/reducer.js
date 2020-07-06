import initialState from './initialState';

export default (state) => {
  if (state === undefined) {
    return initialState();
  }

  return state;
};
