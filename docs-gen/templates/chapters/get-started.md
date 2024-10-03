## Getting started

<br>

### Installation

If you want to use this library inside your project, just install it:

```

npm i mobrix-backend

```

<br>

### Usage

Once installed, you can import this library in your project and use it. 
An example MoBrix-backend app is deployed [here](https://mobrix-backend.onrender.com) , accept both GET and POST requests. Give a try !

<br>

#### Basic example

This is a basic example, with just a standard MoBrix-backend init:

```typescript
import { startMbxBackend } from "mobrix-backend";

startMbxBackend();
```

We can see the default page by navigating to `localhost:3000`:

<p align="center">
<img alt="" src="https://cianciarusocataldo.github.io/mobrix-backend/assets/imgs/basic-example-page.png" width="500px" />
</p>

#### Advanced example

This example inits and starts a MoBrix-backend instance using the configuration parameters. It will listens at port 3000, with 3 GET handlers, a custom callback and a router:

```typescript
import { Request, Response, Router, startMbxBackend } from "mobrix-backend";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const router = Router();

const timeLog = (req: any, res: any, next: () => void) => {
  console.log("Time: ", Date.now());
  next();
};

router.get("/", (req, res) => {
  res.send("router 1 - Main");
});

router.get("/router1-r1", (req, res) => {
  res.send("router 1 - Route 1");
});

startMbxBackend({
  callback: (app) => {
    app.use(timeLog);
  },
  port: Number(port),
  onListen: () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  },
  routers: [{ path: "/router1", router }],
  get: [
    {
      path: "/",
      callback: (req: Request, res: Response) => {
        res.send("MoBrix-backend Server");
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
```

<br>

---
