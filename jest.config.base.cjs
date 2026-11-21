/** Shared Jest base config, extended by each package's own jest.config.cjs. */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "CommonJS",
          target: "ES2020",
          jsx: "react-jsx",
        },
      },
    ],
  },
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  // Source uses explicit ".js" specifiers for relative TS imports (the
  // standard ESM-style convention); strip the extension so Jest's resolver
  // falls back to the real .ts/.tsx file instead of a literal .js file.
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
