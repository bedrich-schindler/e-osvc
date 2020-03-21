module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    '\\.jpg$': '<rootDir>/tests/mocks/emptyMock.js',
    '\\.scss$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/tests/mocks/svgrMock.jsx',
  },
  setupFiles: [
    '<rootDir>/tests/setupJest.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupEnzyme.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  verbose: true,
};
