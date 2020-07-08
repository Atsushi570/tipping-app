module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  setupFiles: ['<rootDir>.jest/setup.js']
}
