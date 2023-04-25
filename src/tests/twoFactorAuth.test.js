import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import speakeasy from "speakeasy";
import Bcrypt from "bcrypt";
import dotenv from "dotenv";
import app from "../index";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: ".env" });

describe("API tests", () => {
  describe("Test API default route", () => {
    it("It should return a welcome string", async () => {
      const res = await chai.request(app).get("/");

      res.should.have.status(200);
      res.body.should.be.a("object");
      const actualValue = res.body.message;
      expect(actualValue).to.be.equal("Welcome to Cogito's Ecommerce app API");
    });
  });

<<<<<<< HEAD
  describe("GET /OTP/sendOTP", () => {
    it("It should create a user, log them in, send TOTP to their email, and delete the user", async () => {
      const user = {
        name: "yr",
        email: "oq@gmail.com",
=======
  describe("GET /users/sendOtp", () => {
    it("It should create a user, log them in, send TOTP to their email, and delete the user", async () => {
      const user = {
        name: "country",
        email: "king@king.com",
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
        password: "test@123",
        phone: "078887567",
        gender: "male",
        birthdate: "2022-04-24",
        roleId: 3,
      };
<<<<<<< HEAD
      const res = await chai.request(app).post("/register").send(user);
      console.log(res);
=======
      const res = await chai.request(app).post("/users/register").send(user);
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
      res.should.have.status(201);
      const response = await chai
        .request(app)
<<<<<<< HEAD
        .post("OTP/login")
=======
        .post("/users/login")
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
        .send({ email: user.email, password: user.password });
      response.should.have.status(200);
      const { token } = response.body;
      console.log('already logged in')

      const sendOTPres = await chai
        .request(app)
<<<<<<< HEAD
        .get("OTP/sendOTP")
=======
        .get("/users/sendOtp")
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
        .set({ Authorization: `Bearer ${token}` });
      sendOTPres.should.have.status(200);
     console.log('OTP SENT SUCCESSFUL')
      const deleteUserRes = await chai
        .request(app)
<<<<<<< HEAD
        .delete("users/deleteUser")
=======
        .delete("/users/deleteUser")
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
        .send({ email: user.email });
      deleteUserRes.should.have.status(200);
    });
  });

<<<<<<< HEAD
  describe("POST OTP/verify", () => {
=======
  describe("POST /users/verify", () => {
>>>>>>> 28eb92b203429aec047801d1e19cfda543623008
    it("It should create an OTP, and validate it", async () => {
      // Generate a secret key for the user
      const { base32: secret } = speakeasy.generateSecret({ length: 20 });

      // Generate an OTP for the user
      const speakeasyToken = speakeasy.totp({
        secret,
        encoding: "base32",
        time: Math.floor(Date.now() / 1000 / 90),
        step: 90,
      });
      console.log(speakeasyToken);
      const salt = await Bcrypt.genSalt(10);
      const hashedOTP = await Bcrypt.hash(speakeasyToken, salt);
      const encodedOTP = Buffer.from(hashedOTP).toString("base64");

      const decodedOTP = Buffer.from(encodedOTP, "base64").toString("utf-8");
      const isMatch = await Bcrypt.compare(speakeasyToken, decodedOTP);
      isMatch.should.be.equal(true);
    });

    it("It should not validate a wrogn otp", async () => {
      // Generate a secret key for the user
      const { base32: secret } = speakeasy.generateSecret({ length: 20 });

      // Generate an OTP for the user
      const speakeasyToken = speakeasy.totp({
        secret,
        encoding: "base32",
        time: Math.floor(Date.now() / 1000 / 90),
        step: 90,
      });
      const salt = await Bcrypt.genSalt(10);
      const hashedOTP = await Bcrypt.hash(speakeasyToken, salt);
      const encodedOTP = Buffer.from(hashedOTP).toString("base64");

      const decodedOTP = Buffer.from(encodedOTP, "base64").toString("utf-8");
      const isMatch = await Bcrypt.compare("111111", decodedOTP);
      isMatch.should.be.equal(false);
    });
  });
});
