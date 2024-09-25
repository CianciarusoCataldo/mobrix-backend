import request from "supertest";
import { Express, Request, Response, Router, initMbxBackend } from "../../src";

describe("MoBrix-backend Get request tests", () => {
  let app: Express;

  const router = Router();

  router.get("/", (req, res) => {
    res.send("MbxBackend test router");
  });

  beforeAll(() => {
    app = initMbxBackend({
      routers: [
        {
          path: "/test-router",
          router,
        },
      ],
    });
  });

  it("should return 200 OK with correct response", async () => {
    const res = await request(app).get("/test-router/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("MbxBackend test router");
  });
});
