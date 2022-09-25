import { createServer } from "../utils/server";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createUser } from "../service/user";
import { UserType } from "../../client/src/types";
import { omit } from "lodash";

const app = createServer();

const createUserPayload = {
  name: "name",
  userType: UserType.Admin,
  password: "password",
  comparePassword: "password",
  email: "email@email.com",
};

describe("users", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const userEmail = "user@qweq.qwe";

        const { statusCode } = await supertest(app).post("/user").send({ email: userEmail });

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        //@ts-expect-error
        const user = await createUser(createUserPayload);

        const { body, statusCode } = await supertest(app).post("/user").send({ email: user.email });

        expect(statusCode).toBe(200);

        expect(body.email).toBe(user.email);
      });
    });
  });
  describe("delete user route", () => {
    it("should delete user", async () => {
      const email = "asd@asd.com";
      //@ts-expect-error
      const { userId } = await createUser({ ...createUserPayload, email });
      const { statusCode } = await supertest(app).delete(`/users/delete/${userId}`);

      expect(statusCode).toBe(200);
    });
  });

  describe("create user route", () => {
    it("should return validation error", async () => {
      const invalidCreateUserPayload = { ...createUserPayload, email: "" };
      const { body, statusCode } = await supertest(app).post("/users/create").send(invalidCreateUserPayload);

      expect(statusCode).toBe(400);

      expect(body.message).toBe("Email is required");
    });

    it("should return created user", async () => {
      const validCreateUserPayload = { ...createUserPayload, email: "qwe@qwe.com" };

      const { body, statusCode } = await supertest(app).post("/users/create").send(validCreateUserPayload);

      expect(statusCode).toBe(200);

      expect(omit(body, ["_id", "createdAt", "updatedAt", "__v"])).toStrictEqual(
        omit(validCreateUserPayload, ["password", "comparePassword"]),
      );
    });
  });
});
