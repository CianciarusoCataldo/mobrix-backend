import {
  MbxBackendInitFunction,
  Express,
  MoBrixBackendConfig,
} from "../../types";

import express from "express";
import bodyParser from "body-parser";

const parseConfig = (config: MoBrixBackendConfig) => ({
  get: [],
  post: [],
  routers: [],
  port: 3000,
  ...config,
});

export const initMbxBackend: MbxBackendInitFunction<Express> = (config) => {
  let app = getMbxBackendApp();
  app.use(bodyParser.json());
  const { get, post, routers } = parseConfig(config);

  get.forEach((element) => {
    app.get(element.path, element.callback);
  });
  post.forEach((element) => {
    app.post(element.path, element.callback);
  });
  routers.forEach((element) => {
    app.use(element.path, element.router);
  });
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
