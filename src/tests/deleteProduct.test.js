import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it, before } from "mocha";
import server from "../index";
import { product } from "../database/models";

chai.use(chaiHttp);
const { expect } = chai;

describe("DELETE /product/:id", () => {
  let sellerToken;

  before(async () => {
    const sellerCredentials = {
      email: "john@example.com",
      password: "kunda123",
    };
    const response = await chai
      .request(server)
      .post("/login")
      .send(sellerCredentials);
    sellerToken = response.body.token;
  });

  describe("when deleting a product with a valid id", () => {
    let itemToDelete;
    before(async () => {
      // create a product to delete
      itemToDelete = await product.create({
        name: "Telephone",
        description: "IPHONE",
        image: ["images.png", "images.png"],
        price: 1000,
        quantity: 100,
        stock: "In Stock",
        category_id: 1,
        vendor_id: 2,
        expiredAt: "2023-12-31",
      });
    });

    after(async () => {
      await product.destroy({ where: { id: itemToDelete.id } });
    });

    it("should delete the product and return a 200 status code", async () => {
      const response = await chai
        .request(server)
        .delete(`/product/${itemToDelete.id}`)
        .set("Authorization", `Bearer ${sellerToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Product deleted successfully");
    });
  });

  describe("when deleting a product with an invalid id", () => {
    it("should return a 404 status code and an error message", async () => {
      const response = await chai
        .request(server)
        .delete("/product/995")
        .set("Authorization", `Bearer ${sellerToken}`);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal("Product id doesn't exist!");
    });
  });

  describe("when attempting to delete a product as a non-seller user", () => {
    let customerToken;
    before(async () => {
      const customerCredentials = {
        email: "kundaaggy@example.com",
        password: "kunda123",
      };
      const response = await chai
        .request(server)
        .post("/login")
        .send(customerCredentials);
      customerToken = response.body.token;
    });

    it("should return a 401 status code and an error message", async () => {
      const response = await chai
        .request(server)
        .delete("/product/1")
        .set("Authorization", `Bearer ${customerToken}`);
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal(
        "You are not authorized to perform this action"
      );
    });
  });
});
