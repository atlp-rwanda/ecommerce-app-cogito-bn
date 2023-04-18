
import {role} from "../database/models";
import {userRole} from "../database/models";
import { config } from "dotenv";
config();


    const createNewRole = async(req, res) => {
        const { roleName, description } = req.body;
        try {
            const newRole = await role.create({roleName, description})
            console.log(newRole)
            return res
        .status(201)
        .json({ message: req.t('role_create_message'), data: newRole });
        } 
        catch (err) {
            console.log('error ' + err);
            return res.status(500).json(err);
        }   
    }

    const getAllRoles = async(req, res)=>{
        try {
            const roles = await role.findAll();
            res.status(200).json({ message: req.t('role_fetch_message'), data: roles });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const getOneRole = async(req, res) => {
        const id = req.params.id;
        try {
            const roles = await role.findOne({
                where: { id },
            });
            if (roles) {
                res.status(200).json({ message: req.t('role_fetch_message'), data: roles });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('role_unexist_message'),
                });
            }
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const deleteOneRole = async(req, res) => {
        const id = req.params.id;
        const roles = await role.findOne({
            where: { id},});
        try {
            if (roles) {
                await role.destroy({
                    where: {
                        id
                    },});
                res.status(200).json({
                    statusCode: 200,
                    message: req.t('role_delete_message')
                    
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('role_unexist_message'),
                });}
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }}

    const updateOneRole = async(req, res)=> {
        const id = req.params.id;
        const roles = await role.findOne({
            where: { id },});
        const { roleName, description } = req.body;
        try {
            if (!roles) {
                return res.status(404).json({
                    statusCode: 404,
                    message: req.t('role_unexist_message'),
                });
            } else {    
                await role.update(
                    { roleName, description },
                    {
                        where: {id},});
                return res
                    .status(201)
                    .json({ statusCode: 201, message: req.t('role_update_message'),data:role });}
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });
        }}

    const setRole = async (req, res) => {
        const roleData = {
            userId: req.body.userId,
            roleId: req.body.roleId,
        }
        if (!userId) {
            return res.status(404).send(`${userId} is not found`);
          }
        try {
            const userRoles = await userRole.create(roleData)
            return res.status(201).json({ message: req.t('set-role-message'), response: userRoles }) 
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    const usersWithRoles = async(req, res)=>{
        try {
            const userWithrole = await userRole.findAll();
            res.status(200).json({ statusCode: 200, data: userWithrole });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }
    const userWithRole = async (req, res) => {
        const { id } = req.params
        try {
            const UserWithRole = await userRole.findOne({
                where: { id },
            });      
            if (UserWithRole) {
                res.status(200).json({ statusCode: 200, data: UserWithRole });
            }
             else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    const updateUserWithRole= async(req, res)=> {
        const id = req.params.id;
        const UserWithRole = await userRole.findOne({
            where: { id },});
        const { userId, roleId } = req.body;
        try {
            if (!UserWithRole) {
                return res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            } else {       
                await userRole.update(
                    { userId, roleId },
                    {
                        where: {id},});
                return res
                    .status(201)
                    .json({ statusCode: 201, message: req.t('update_message'),data:UserWithRole });
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });
        } }
        
    const deleteUserWithRole = async(req, res) => {
        const id = req.params.id;
        const UserWithRole = await userRole.findOne({
            where: { id},
        });
        try {
            if (UserWithRole) {
                await userRole.destroy({
                    where: {
                        id
                    },});
                res.status(200).json({
                    statusCode: 200,
                    message: req.t('delete_message'),    
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });}
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }}


export default {
    createNewRole,
    getAllRoles,
    getOneRole,
    deleteOneRole,
    updateOneRole,
    setRole,
    usersWithRoles,
    userWithRole,
    updateUserWithRole,
    deleteUserWithRole
   
};
