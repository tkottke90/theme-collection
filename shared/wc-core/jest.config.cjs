const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  rootDir: ".",
  testEnvironment: "jsdom",
  // lit ships as pure ESM with no CommonJS build; transform it (and its
  // ESM-only dependencies) with babel-jest instead of leaving it ignored.
  transformIgnorePatterns: ["/node_modules/(?!(lit|lit-html|lit-element|@lit)/)"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "CommonJS",
          target: "ES2020",
          experimentalDecorators: true,
          useDefineForClassFields: false,
        },
      },
    ],
    "^.+\\.js$": ["babel-jest", { configFile: require.resolve("../../babel.config.cjs") }],
  },
};
