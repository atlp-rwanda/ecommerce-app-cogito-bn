import bcrypt from "bcrypt";
import "dotenv/config"


export const hashpassword = (password)=>{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;

};


export const isPasswordMatching=(password, hashedPassword)=>{
        return bcrypt.compareSync(password, hashedPassword)
    };