const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  rootDir: ".",
  testEnvironment: "jsdom",
  // preact's package exports a browser-conditioned ESM build for
  // "preact/jsx-runtime"; jest-environment-jsdom defaults to requesting
  // that condition, but Jest's CJS-based runtime can't execute it. Force
  // the plain require/node conditions instead.
  testEnvironmentOptions: {
    customExportConditions: [],
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "CommonJS",
          target: "ES2020",
          jsx: "react-jsx",
          jsxImportSource: "preact",
        },
      },
    ],
  },
};
