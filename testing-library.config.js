// testing-library.config.js
import '@testing-library/jest-dom';

export default {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/testing-library.config.js'],
};
