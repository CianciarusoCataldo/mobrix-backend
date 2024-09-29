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
 */
export type MoBrixBackendConfig = {
  /** Custom backend listening port (default 3000) */
  port?: number;

  /** */
  get?: {
    path: string;
    callback: any;
  }[];

  /** */
  post?: {
    path: string;
    callback: any;
  }[];

  /** */
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
