import express from "express";
import { MoBrixBackendConfig } from "../../types";

export const initMbxBackend = ({
  port = 3000,
  get = [],
  post = [],
  routers = [],
  onListen = () => {},
}: MoBrixBackendConfig) => {
  let app = express();
  get.forEach((element) => {
    app.get(element.path, element.callback);
  });
  post.forEach((element) => {
    app.post(element.path, element.callback);
  });
  routers.forEach((element) => {
    app.use(element.path, element.router);
  });
  app.listen(port, onListen);
};

export const getMbxBackend = ()=>{
  const app = express();
  return app;
}