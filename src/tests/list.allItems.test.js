import chai from "chai";
import { expect } from "chai";
import app from "../index";
import chaiHttp from "chai-http";
chai.expect();
chai.use(chaiHttp)

describe("Testing Product routes" ,()=>{
  it("Seller should be able to retrieve a list all of items" , async ()=>{
    const seller = await chai.request(app).post("/login").send({
      email: "john@example.com",
      password: "kunda123",
    });
    //console.log(seller.body.token,"this seller")
    const userToken = `Bearer ${seller.body.token}`
    const res = await chai.request(app).get("/seller/items").set("Authorization",userToken )
    expect(res.status).to.be.equal(200);
  },60000)

  it("Buyer should be able to retrieve a list of all items on available of items ", async ()=>{
    const buyer = await chai.request(app).post("/login").send({
      email: "kundaaggy@example.com",
      password: "kunda123",
    });
    const userToken = `Bearer ${buyer.body.token}`
    const res = await chai.request(app).get("/buyer/items").set("Authorization",userToken)
    expect(res.status).to.be.equal(200);
  },60000)
})