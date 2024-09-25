import request from "supertest";
import {
  Express,
  getMbxBackendApp,
  Response,
  initMbxBackend,
  json,
  static as MbxBackendStatic,
  urlencoded,
} from "../../src";

describe("MoBrix-backend global tests", () => {
  let app: Express;
  let onListenMockFunction;

  it("should call onListen function when starting listening on selected port", async () => {
    onListenMockFunction = jest.fn();
    app = initMbxBackend({
      onListen: onListenMockFunction,
    });
    await request(app).get("/");
    expect(onListenMockFunction).toBeCalled;
  });

  it("shouldn't call onListen function if not set", async () => {
    onListenMockFunction = jest.fn();
    app = initMbxBackend();
    await request(app).get("/");
    expect(onListenMockFunction).not.toBeCalled;
  });
});
