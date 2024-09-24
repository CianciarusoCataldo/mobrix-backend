const typescript = require("rollup-plugin-typescript2");
const del = require("rollup-plugin-delete");
const terser = require("@rollup/plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

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
      del({ targets: ["dist/*", "playground/src/mobrix-backend-preview"] }),
      nodeResolve(),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    treeshake: true,
    external: Object.keys(pkg.peerDependencies || []),
  },
];
