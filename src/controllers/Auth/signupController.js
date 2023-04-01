
import db from "../../database/models/index"
import dotenv from "dotenv";
import {user} from "../../database/models"
dotenv.config();
const Buyer=db.sequelize
const signUp = async (req, res) => {
    try {
      
       const newUser ={
        email:req.body.email,
        password:req.body.password
        }
        user.create(newUser).then(data=>{
            res.status(201).json({
                message:"User Created Successful",
                 data
              })
        })

     
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"failed to create"
        })
        
    }


};

export default { signUp };
