/**
 * Only used by Jest (via babel-jest) to transpile pure-ESM node_modules
 * packages (e.g. lit) that ship no CommonJS build, for packages whose
 * jest.config.cjs opts into it via transformIgnorePatterns. Not used for
 * any application/package build step (those go through esbuild).
 */
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
