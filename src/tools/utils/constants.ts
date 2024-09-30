import { MoBrixBackendConfig } from "../../types";

export const defaultConfig: MoBrixBackendConfig = {
  get: [
    {
      path: "/",
      callback: (req, res) => {
        res.send(
          '<html><body style="font-size:xx-large;display:flex;"><p style="margin:auto">MoBrix-backend Server</p></body></html>'
        );
      },
    },
  ],
  post: [],
  routers: [],
  port: 3000,
  callback: () => {},
  middlewares: [],
};
