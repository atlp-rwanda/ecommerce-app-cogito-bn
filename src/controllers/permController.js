
import {permission,rolepermission} from "../database/models";
    
    const createNewPermission = async(req, res)=> {
    const { permName, description } = req.body; 
        try {
            const newPermission = await permission.create({permName, description})
            return res
        .status(201)
        .json({ message: req.t('permission_create_message'), data: newPermission });
        } 
        catch (err) {
            console.log('error ' + err);
            return res.status(500).json(err);
        }     
    }

    const getAllPermission = async(req, res)=> {
        try {
            const permissions = await permission.findAll();
            res.status(200).json({ statusCode: 200, data: permissions });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const getOnePermission = async(req, res)=> {
        const id = req.params.id;
        console.log(id);
        try {
            const permissions = await permission.findOne({
                where: { id },
            });
            if (permissions) {
                return res.status(200).json({ statusCode: 200, data: permissions });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            }
        } catch (error) {
            return res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const deleteOnePermission = async(req, res)=> {
        const id = req.params.id;
        const Permission = await permission.findOne({
            where: { id },
        });
        try {
            if (Permission) {
                await permission.destroy({
                    where: {
                        id
                    },
                });
                res.status(200).json({
                    statusCode: 200,
                    message: req.t('permission_delete_message'),
                    
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            }
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }

    const updateOnePermission = async (req, res)=> {
        const id = req.params.id;
        const Permission = await permission.findOne({
            where: { id },});
        const { permName, description } = req.body;
        try {
            if (!Permission) {
                return res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            } else {              
                await permission.update(
                    { permName, description },
                    {
                        where: {id},});
                return res
                    .status(201)
                    .json({ statusCode: 201, message: req.t('permission_update_message') });}
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });
            }}
    const setPermission = async (req, res) => {
        const rolePermissionData = {
            roleId: req.body.roleId,
            permissionId: req.body.permissionId,
        };  
        try {
            const rolePermissions = await rolepermission.create(rolePermissionData)
            return res.status(201).json({ message: req.t('set-permission-message'), response: rolePermissions })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }}

    const getRoleWithPermission = async(req, res)=>{
        try {
            const RoleWithPermission = await rolepermission.findAll();
            res.status(200).json({ statusCode: 200, data: RoleWithPermission });
        } catch (error) {
            res.status(400).json({ statusCode: 400, data: error });
        }
    }
    const getoneRoleWithPermission = async (req, res) => {
        const { id } = req.params  
        try {          
        const RoleWithPermission = await rolepermission.findOne({
            where: { id },
        });   
            if (RoleWithPermission) {
                res.status(200).json({ statusCode: 200, data: RoleWithPermission });
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
    const updateRoleWithPermission= async(req, res)=> {
        const id = req.params.id;
        const RoleWithPermission = await rolepermission.findOne({
            where: { id },});
        const { roleId,permissionId } = req.body;
        try {
            if (!RoleWithPermission) {
                return res.status(404).json({
                    statusCode: 404,
                    Message: req.t('id_unexist_message'),
                });
            } else {
                await rolepermission.update(
                    {  roleId,permissionId },
                    {
                        where: {id},});
                return res
                    .status(201)
                    .json({ statusCode: 201, message: req.t('update_message'), data:RoleWithPermission });
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ statusCode: 400, error: "Server error" });
        }}
    const deleteRoleWithPermission = async(req, res) => {
        const id = req.params.id;
        const RoleWithPermission = await rolepermission.findOne({
            where: { id},
        });
        try {
            if (RoleWithPermission) {
                await rolepermission.destroy({
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
        } }

export default {

    createNewPermission,
    getAllPermission,
    getOnePermission,
    updateOnePermission,
    deleteOnePermission,
    setPermission,
    getRoleWithPermission,
    getoneRoleWithPermission,
    updateRoleWithPermission,
    deleteRoleWithPermission
};
