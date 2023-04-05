import dotenv from 'dotenv';
import {createNewRole,getAllRole,getRoleById,updateRoleById,deleteRoleById,
  createNewPermission,getAllPermission,getPermissionById,updatePermissionById,
deletePermissionById,createNewUser,getAllUser,getUserById,updateUserById,
deleteUserById,createuserRole,getAlluserRole,getuserRoleById,updateuserRoleById,
deleteuserRoleById,createrolePermission,getAllrolePermission,getrolePermissionById,
updaterolePermissionById,deleterolePermissionById} from './rolePermissionSwagger'

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Cogito's ecommerce API Library",
      version: 1.0,
      description: 'This is an API of an ecommerce platform that will allow sellers to manage and sell their stock while facilitating buyers smooth online shopping',
    },
    paths: {
      '/role': { post:createNewRole, get:getAllRole },
      '/role/{id}': {get:getRoleById, put:updateRoleById, delete:deleteRoleById},
      '/user': { post:createNewUser, get:getAllUser },
      '/user/{id}': {get:getUserById, put:updateUserById, delete:deleteUserById},
      '/permission': { post:createNewPermission, get:getAllPermission },
      '/permission/{id}': {get:getPermissionById, put:updatePermissionById, delete:deletePermissionById},
      '/setRole': {post:createuserRole},
      '/users/Roles': {  get:getAlluserRole },
      '/users/Roles/{id}': {get:getuserRoleById, put:updateuserRoleById, delete:deleteuserRoleById},
      '/setpermission':{ post:createrolePermission},
      '/roles/permissions': { get:getAllrolePermission },
      '/roles/permissions/{id}': {get:getrolePermissionById, put:updaterolePermissionById, delete:deleterolePermissionById},
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL,
      description: 'Api server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  apis: ['./src/routes/*.js'],


};

export default options;
