import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import dotenv from "dotenv";
import json from "@rollup/plugin-json";
import pkg from "./package.json" assert { type: "json" };

dotenv.config();

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
    {
      file: "dist/index.mjs",
      format: "esm",
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "tsconfig.json",
      clean: true,
    }),
    copy({
      targets: [
        {
          src: "playground/src/mobrix-backend-preview/**/*",
          dest: "dist/mobrix-backend-preview",
        },
      ],
    }),
  ],
  external: Object.keys(pkg.peerDependencies || []),
};
