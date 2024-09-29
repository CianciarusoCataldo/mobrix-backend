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

const timeLog = (req: any, res: any, next: () => void) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", (req, res) => {
  res.send("router 1 - Main");
});

router.get("/router1-r1", (req, res) => {
  res.send("router 1 - Route 1");
});

startMbxBackend({
  callback: (app) => {
    app.use("/router1", router);
  },
  port: Number(port),
  onListen: () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  },
  //routers: [{ path: "/router1", router }],
  get: [
    {
      path: "/",
      callback: (req: Request, res: Response) => {
        res.send("Express + TypeScript Server");
      },
    },
    {
      path: "/r1",
      callback: (req: Request, res: Response) => {
        res.send("Main path - Route 1");
      },
    },
    {
      path: "/r2",
      callback: (req: Request, res: Response) => {
        res.send("Main path - Route 2");
      },
    },
  ],
});
