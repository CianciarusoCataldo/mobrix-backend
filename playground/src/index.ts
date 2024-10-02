import {
  Request,
  Response,
  Router,
  startMbxBackend,
} from "./mobrix-backend-preview";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const router = Router();

router.get("/", (req, res) => {
  res.send(formatText("MoBrix-backend example server - Router - '/'"));
});

router.get("/router-route", (req, res) => {
  res.send(
    formatText(
      "MoBrix-backend example server - Router - Example route ('/router-route')"
    )
  );
});

const formatText = (input: string) =>
  `<html><body style="font-size:xx-large;display:flex;"><p style="margin:auto">${input}</p></body></html>`;

const standardElement = (input: string, path: string) => ({
  path,
  callback: (req: Request, res: Response) => {
    res.send(formatText(input));
  },
});

startMbxBackend({
  port: Number(port),
  routers: [{ path: "/router", router }],
  get: [
    standardElement("MoBrix-backend Server", "/"),
    standardElement("MoBrix-backend Server - Example route", "/route"),
  ],
  post: [
    {
      path: "/submit",
      callback: (req: Request, res: Response) => {
        const { name } = req.body;
        if (name) {
          res.status(201).send(`Hello, ${name}`);
        } else {
          res.status(400).send("Name is required");
        }
      },
    },
  ],
});
