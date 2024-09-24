const analyze = require("rollup-plugin-analyzer");
const typescript = require("rollup-plugin-typescript2");
const del = require("rollup-plugin-delete");
const terser = require("@rollup/plugin-terser");
const cleanup = require("rollup-plugin-cleanup");
const pkg = require("../package.json");


module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: pkg.module,
        format: "esm",
        plugins: [],
      },
    ],
    plugins: [
      del({ targets: ["dist/*"] }),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      cleanup({ comments: "none" }),
      analyze({ skipFormatted: false, stdout: true, summaryOnly: true }),
    ],
    external: Object.keys(pkg.peerDependencies || []),
  },
];
