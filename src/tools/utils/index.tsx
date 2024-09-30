import {
    MbxBackendInitFunction,
    Express,
    MoBrixBackendConfig,
  } from "../../types";
  
  import express from "express";
  import { json } from "body-parser";
  import { defaultConfig } from "./constants";
  
  /**
   *
   * Get a clean Expressjs app instance
   *
   * @since 1.0.0
   *
   * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
   *
   * @copyright 2024 Cataldo Cianciaruso
   *
   * @see https://cianciarusocataldo.github.io/mobrix-backend
   *
   */
  const getMbxBackendApp = () => {
    const app = express();
    return app;
  };
  
  /**
   *
   * Parse MoBrix-backend config parameters, replacing them with default values if not already set
   *
   * @since 1.0.0
   *
   * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
   *
   * @copyright 2024 Cataldo Cianciaruso
   *
   * @see https://cianciarusocataldo.github.io/mobrix-backend
   *
   */
  const parseConfig = (config?: MoBrixBackendConfig): MoBrixBackendConfig =>
    config
      ? {
          ...defaultConfig,
          ...config,
        }
      : defaultConfig;
  
  /**
   *
   * Init, configure and return a MoBrix-backend app instance
   *
   * @since 1.0.0
   *
   * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
   *
   * @copyright 2024 Cataldo Cianciaruso
   *
   * @see https://cianciarusocataldo.github.io/mobrix-backend
   *
   */
  export const initMbxBackend: MbxBackendInitFunction<Express> = (
    config
  ) => {
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
  
  /**
   *
   * Init, configure and start a MoBrix-backend app instance
   *
   * @since 1.0.0
   *
   * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
   *
   * @copyright 2024 Cataldo Cianciaruso
   *
   * @see https://cianciarusocataldo.github.io/mobrix-backend
   *
   */
  /* istanbul ignore next */
  export const startMbxBackend: MbxBackendInitFunction<void> = (config) => {
    let app = initMbxBackend(config);
    const port = config?.port || defaultConfig.port;
    const onListen =
      config?.onListen ||
      (() =>
        console.log(
          `[MoBrix-backend]: Server is running at http://localhost:${port}`
        ));
    app.listen(port, onListen);
  };
  
  export {
    /* istanbul ignore next */ json,
    /* istanbul ignore next */ static,
    /* istanbul ignore next */ urlencoded,
  } from "express";
  