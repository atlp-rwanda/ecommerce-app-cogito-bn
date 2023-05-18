import chai from "chai";
import { expect } from "chai";
import app from '../index';
import chaiHttp from "chai-http";

chai.expect();
chai.use(chaiHttp);
describe("Testing Clear cart",()=>{
    it("Buyer should be able to clear their cart" , async()=>{
        const buyer = await chai.request(app).post("/login").send({
            email: "kundaaggy@example.com",
            password: "kunda123",
          });
          const userToken = `Bearer ${buyer.body.token}`
          const res = await chai.request(app).delete("/cart/clear").set("Authorization",userToken)
          expect(res.status).to.be.equal(200);
    },60000)
})