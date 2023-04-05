
import {user} from "../database/models";

import { config } from "dotenv";
config();

/* eslint-disable @typescript-eslint/no-explicit-any */
// class UsersController {
    
    const createNewUser = async(req, res)=> {
    const { firstName,lastName, password, email, role } = req.body; 
        try {
            const newUser = await user.create({firstName,lastName, password, email, role })
            console.log(newUser)
            return res
        .status(201)
        .json({ message: 'user created', data: newUser });
        } 
        catch (err) {
            console.log('error ' + err);
            return res.status(500).json(err);
        }
     
        
    }

    const getAllUser = async(req, res)=> {
        try {
            const users = await user.findAll();
            res.status(200).json({ statusCode: 200, data: users });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const getOneUser = async(req, res)=> {
        const id = req.params.id;
        console.log(id);
        try {
            const users = await user.findOne({
                where: { id },
            });
            if (users) {
                return res.status(200).json({ statusCode: 200, data: users });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: `User with id ${id}  does not exist`,
                });
            }
        } catch (error) {
            return res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const deleteOneUser = async(req, res)=> {
        const email = req.params.name;
        const user = await user.findOne({
            where: { name: email },
        });
        try {
            if (user) {
                await user.destroy({
                    where: {
                        name: email,
                    },
                });
                res.status(200).json({
                    statusCode: 200,
                    message: "Success",
                    "Deleted User": user,
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: `User with email ${email} does not exist`,
                });
            }
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const updateOneUser = async(req, res)=> {
        const userName = req.params.name;
        const users = await user.findOne({
            where: { name: userName },
        });
        const { name, description } = req.body;
        try {
            if (!users) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `user with the name ${email} does not exist`,
                });
            } else {          
                await user.update(
                    { name, description },
                    {
                        where: {name: userName,},
                    });
                return res
                    .status(201)
                    .json({ statusCode: 201, message: "Success" }); }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });} }

export default {
    createNewUser,
    getAllUser,
    getOneUser,
    deleteOneUser,
    updateOneUser
};
