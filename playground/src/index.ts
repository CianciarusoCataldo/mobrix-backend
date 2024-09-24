import { Request, Response, Router, initMbxBackend } from "./mobrix-backend-preview";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const router = Router()

// middleware that is specific to this router
const timeLog = (req: any, res: any, next: () => void) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

initMbxBackend({
  port: Number(port),
  onListen: () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  },
  routers: [{ path: "/router1", router }],
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
        res.send("Route1");
      },
    },
    {
      path: "/r2",
      callback: (req: Request, res: Response) => {
        res.send("Route2");
      },
    },
  ],
});
