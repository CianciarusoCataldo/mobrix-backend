import request from "supertest";
import { Express, Request, Response, initMbxBackend } from "../../src";

describe("MoBrix-backend Post request tests", () => {
  let app: Express;

  beforeAll(() => {
    app = initMbxBackend({
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
  });

  it("should return 201 Created with correct response when body is valid", async () => {
    const res = await request(app).post("/submit").send({ name: "John" });
    expect(res.status).toBe(201);
    expect(res.text).toBe("Hello, John");
  });

  it("should return 400 Bad Request when name is missing in body", async () => {
    const res = await request(app).post("/submit").send({});
    expect(res.status).toBe(400);
    expect(res.text).toBe("Name is required");
  });

  it("should return 404 Not Found when requesting an invalid route", async () => {
    const res = await request(app).post("/invalid-route").send({ name: "John" });
    expect(res.status).toBe(404);
  });
});
