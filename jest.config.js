// jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/testing-library.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.vue', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
};
