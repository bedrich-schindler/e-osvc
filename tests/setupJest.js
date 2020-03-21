import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

fetchMock.config.overwriteRoutes = true;

console.error = (error) => {
  throw new Error(error);
};

console.warn = (error) => {
  throw new Error(error);
};

process.on('unhandledRejection', (err) => {
  fail(err);
});
