import {
  Application,
  NextFunction,
  Response,
  Request,
  Express,
  Router,
} from "express";

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 *
 * MoBrix-backend configuration parameters.
 *
 * @since 1.0.0
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2024 Cataldo Cianciaruso
 *
 * @see https://cianciarusocataldo.github.io/mobrix-backend
 * @see https://expressjs.com
 * @see https://expressjs.com/en/4x/api.html
 *
 */
export type MoBrixBackendConfig = {
  /**
   * Custom Expressjs app listening port (default 3000)
   *
   * @see https://expressjs.com/en/4x/api.html#app.listen
   */
  port?: number;

  /** Custom Expressjs app get handlers array. Every handler is composed by a path and a callback function
   *
   * @see https://expressjs.com/en/guide/routing.html
   * @see https://expressjs.com/en/4x/api.html#app.get
   */
  get?: {
    path: string;
    callback: (req: Request, res: Response) => void;
  }[];

  /** Custom Expressjs app post handlers array. Every handler is composed by a path and a callback function
   *
   * @see https://expressjs.com/en/guide/routing.html
   * @see https://expressjs.com/en/4x/api.html#app.post.method
   */
  post?: {
    path: string;
    callback: (req: Request, res: Response) => void;
  }[];

  /** Custom Expressjs app routers array. Every handler is composed by a path and a Router
   *
   * @see https://expressjs.com/en/guide/routing.html
   * @see https://expressjs.com/en/4x/api.html#router
   */
  routers?: {
    path: string;
    router: Router;
  }[];

  /** Custom function called everytime the backend app is listening for incoming requests */
  onListen?: () => void;

  /** Custom function to interact directly with internal Expressjs app */
  callback?: (app: Express) => void;

  /** Custom middlewares function loaded into the Express app */
  middlewares?: ((req: Request, res: Response, next: NextFunction) => void)[];
};

export type MbxBackendInitFunction<T = void> = (
  config?: MoBrixBackendConfig
) => T;

export { Application, NextFunction, Response, Request, Express, Router };
