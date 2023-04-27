import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index"; // assuming the app is exported as "app"
import { product } from "../database/models";

chai.use(chaiHttp);
const expect = chai.expect;

describe("searchProducts function", () => {
  before(async () => {
    // create some sample products in the database
    await product.bulkCreate([
      {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        price: 10,
      },
      {
        id: 2,
        name: "Product 2",
        description: "Description 2",
        price: 20,
      },
      {
        id: 3,
        name: "Product 3",
        description: "Description 3",
        price: 30,
      },
      {
        id: 4,
        name: "Test Product",
        description: "Test Description",
        price: 10,
      },
    ]);
  });

  after(async () => {
    // clean up the database after the tests are done
    await product.destroy({ where: {} });
  });

  it("should return a single product by ID", async () => {
    const res = await chai.request(app).get("/search?id=1");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.name).to.equal("Product 1");
  });

  it("should return products by name", async () => {
    const res = await chai.request(app).get("/search?name=Product 2");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal("Product 2");
  });

  it("should return products by description", async () => {
    const res = await chai.request(app).get("/search?description=3");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
    expect(res.body[0].description).to.equal("Description 3");
  });

  it("should return products by price", async () => {
    const res = await chai.request(app).get("/search?price=20");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
    expect(parseInt(res.body[0].price)).to.equal(20);
  });

  it("should return an error for invalid ID", async () => {
    const res = await chai.request(app).get("/search?id=invalid");
    expect(res).to.have.status(500);
    expect(res.body).to.be.an("object");
    expect(res.body.error).to.equal("Internal Server Error");
  });

  it("should return a message 'Product not found' for non-matching name", async () => {
    const res = await chai
      .request(app)
      .get("/search?name=Non-existent");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.message).to.equal("Product not found");
  });
});
