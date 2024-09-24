import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // Aggiunto per la compatibilità con CommonJS
import copy from "rollup-plugin-copy"; // Aggiunto per copiare la libreria
import dotenv from "dotenv"; // Aggiunto per caricare le variabili d'ambiente
import json from "@rollup/plugin-json"; // Importa il plugin JSON
import pkg from './package.json' assert { type: 'json' };

dotenv.config(); // Carica le variabili d'ambiente dal file .env

export default {
  input: "src/index.ts", // Punto di ingresso della tua app
  output: [
    {
      file: "dist/index.cjs", // Uscita in formato CommonJS
      format: "cjs",
    },
    {
      file: "dist/index.mjs", // Uscita in formato ESModule
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
  external: Object.keys(pkg.peerDependencies || []), // Esclude le dipendenze specificate in peerDependencies
};
