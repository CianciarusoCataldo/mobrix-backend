import {
  MbxBackendInitFunction,
  Express,
  MoBrixBackendConfig,
} from "../../types";

import express from "express";
import { json } from "body-parser";

const parseConfig = (config: MoBrixBackendConfig): MoBrixBackendConfig => ({
  get: [],
  post: [],
  routers: [],
  port: 3000,
  callback: () => {},
  middlewares: [],
  ...config,
});

export const initMbxBackend: MbxBackendInitFunction<Express> = (config) => {
  let app = getMbxBackendApp();

  app.use(json());
  const { callback, get, middlewares, post, routers } = parseConfig(config);

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  get.forEach((element) => {
    app.get(element.path, element.callback);
  });

  post.forEach((element) => {
    app.post(element.path, element.callback);
  });

  routers.forEach((element) => {
    app.use(element.path, element.router);
  });

  callback(app);

  return app;
};

/* istanbul ignore next */
export const startMbxBackend: MbxBackendInitFunction<void> = (config) => {
  const { port, onListen, ...parsedConfig } = parseConfig(config);
  let app = initMbxBackend(parsedConfig);
  app.listen(port, onListen);
};

export const getMbxBackendApp = () => {
  const app = express();
  return app;
};

export {
  /* istanbul ignore next */ json,
  /* istanbul ignore next */ static,
  /* istanbul ignore next */ urlencoded,
} from "express";
