module.exports = {
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.js$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    testEnvironment: 'jsdom', 
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },
  };
  