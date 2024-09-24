const typescript = require("rollup-plugin-typescript2");
const terser = require("@rollup/plugin-terser");

const pkg = require("../package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "playground/src/mobrix-backend-preview/index.cjs",
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: "playground/src/mobrix-backend-preview/index.mjs",
        format: "esm",
      },
      {
        file: pkg.main,
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || []),
  },
];
