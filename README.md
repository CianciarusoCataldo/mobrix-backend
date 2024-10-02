# MoBrix-backend

<br>

![Maintenance](https://img.shields.io/maintenance/yes/2025?label=Maintained&style=for-the-badge)
![NPM](https://img.shields.io/npm/l/mobrix-backend?label=License&style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/mobrix-backend?color=orange%20&label=Latest%20version&style=for-the-badge&logo=npm)

![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/mobrix-backend?label=Package%20size&logo=npm)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)](https://github.com/facebook/jest)
[![MoBrix-backend CI](https://github.com/CianciarusoCataldo/mobrix-backend/actions/workflows/mobrix-backend-CI.yml/badge.svg?branch=main)](https://github.com/CianciarusoCataldo/mobrix-backend/actions/workflows/mobrix-backend-CI.yml)
<a href="https://snyk.io/test/github/CianciarusoCataldo/mobrix-backend">
<img src="https://snyk.io/test/github/CianciarusoCataldo/mobrix-backend/badge.svg?targetFile=package.json&style=for-the-badge" height="20px"/>
</a>

<br>

<p align="center">
<img alt="" src="https://cianciarusocataldo.github.io/mobrix-backend/assets/mobrix-backend_icon.png" width="300px" />
</p>

<br>

An intuitive Express.js wrapper, to easily build an expressjs backend with a simplified configuration

<br>

## Summary

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic example](#basic-example)
    - [Advanced example](#advanced-example)
- [Configuration parameters](#configuration-parameters)
- [Tests](#tests)
- [Authors](#authors)
- [License](#license)

<br>

---

<br>

Check out the [official MoBrix-backend guide page](https://cianciarusocataldo.github.io/mobrix-backend) for more details

---

<br>

## Getting started

<br>

### Installation

If you want to use this library inside your project, just install it:

```

npm i mobrix-backend

```

<br>

### Usage

Once installed, you can import this library in your project and use it:

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

An example MoBrix-backend app is running at https://mobrix-backend.onrender.com/ , accept both GET and POST requests. Give a try !

<br>

---

## Configuration parameters

| Parameter                                                                                         | Description                                                                                             | Default value |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| [callback](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#callback)       | Custom function to interact directly with internal Expressjs app                                        | /             |
| [get](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#get)                 | Custom Expressjs app `get` handlers array. Every handler is composed by a path and a callback function  | []            |
| [middlewares](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#middlewares) | Custom middlewares function loaded into the Express app                                                 | []            |
| [onListen](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#onlisten)       | Custom function called everytime the backend app is listening for incoming requests                     | /             |
| [port](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#port)               | Custom Expressjs app listening port                                                                     | 3000          |
| [post](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#post)               | Custom Expressjs app `post` handlers array. Every handler is composed by a path and a callback function | []            |
| [routers](https://cianciarusocataldo.github.io/mobrix-backend/api/Configuration/#routers)         | Custom Expressjs app `routers` array. Every handler is composed by a path and a Router                  | []            |

<br>

---

## Tests

Unit tests are located inside `tests` folder. The test script is executed with pre-defined test command:

    npm run test

<br>

---

## Authors

- [**Cataldo Cianciaruso**](https://github.com/CianciarusoCataldo)

## <br>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
