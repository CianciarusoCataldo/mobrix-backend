import request from "supertest";
import { Express, Request, Response, initMbxBackend } from "../../src";

describe("MoBrix-backend Get request tests", () => {
  let app: Express;

  beforeAll(() => {
    app = initMbxBackend({
      get: [
        {
          path: "/test",
          callback: (req: Request, res: Response) => {
            res.status(200).send("MbxBackend test route");
          },
        },
      ],
    });
  });

  it("should return 200 OK with correct response", async () => {
    const res = await request(app).get("/test");
    expect(res.status).toBe(200);
    expect(res.text).toBe("MbxBackend test route");
  });

  it("should return 404 Not found when requesting an invalid route", async () => {
    const res = await request(app).get("/invalid-route");
    expect(res.status).toBe(404);
  });
});
