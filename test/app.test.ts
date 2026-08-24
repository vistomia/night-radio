import request from "supertest";
import app from "../src/app";

describe("GET /users", function () {
  it("test 0", async function () {
    const response = await request(app).get("/");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("opa mundo");
  });
});
