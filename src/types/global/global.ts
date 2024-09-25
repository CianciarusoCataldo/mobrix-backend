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

export type MoBrixBackendConfig = {
  port?: number;
  get?: {
    path: string;
    callback: any;
  }[];
  post?: {
    path: string;
    callback: any;
  }[];
  routers?: {
    path: string;
    router: Router;
  }[];
  onListen?: () => void;
};

export type MbxBackendInitFunction<T = void> = (
  config?: MoBrixBackendConfig
) => T;

export { Application, NextFunction, Response, Request, Express, Router };
