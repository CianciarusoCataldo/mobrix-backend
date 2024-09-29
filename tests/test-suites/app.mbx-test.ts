import request from "supertest";
import {
  Express,
  getMbxBackendApp,
  Response,
  initMbxBackend,
  json,
  static as MbxBackendStatic,
  urlencoded,
  Router,
} from "../../src";

describe("MoBrix-backend global tests", () => {
  let app: Express;
  let customFunction;

  it("should call onListen function when starting listening on selected port", async () => {
    customFunction = jest.fn();
    app = initMbxBackend({
      onListen: customFunction,
    });
    await request(app).get("/");
    expect(customFunction).toBeCalled;
  });

  it("shouldn't call onListen function if not set", async () => {
    customFunction = jest.fn();
    app = initMbxBackend();
    await request(app).get("/");
    expect(customFunction).not.toBeCalled;
  });

  it("should call the custom callback function during app init", async () => {
    customFunction = (app: Express) => {
      const router = Router();

      router.get("/test-router-route", (req, res) => {
        res.send("Test router 1 - Test route 1");
      });

      app.use("/test-router", router);
    };
    app = initMbxBackend({
      callback: customFunction,
    });
    const res = await request(app).get("/test-router/test-router-route");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Test router 1 - Test route 1");
  });

  it("should call custom middleware function during app execution", async () => {
    const mockFunction = jest.fn();
    customFunction = (req, res, next) => {
      mockFunction();
      next();
    };
    app = initMbxBackend({
      middlewares: [customFunction],
    });
    await request(app).get("/");
    expect(mockFunction).toBeCalled;
  });
});
