import { permission, rolepermission, role } from '../database/models';

const createNewPermission = async (req, res) => {
  const { permissionName, description } = req.body;
  try {
    const newPermission = await permission.create({ permissionName, description });
    return res.status(201).json({
      statusCode: 201,
      message: req.t('permission_create_message'),
      data: newPermission,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllPermission = async (req, res) => {
  try {
    const permissions = await permission.findAll();
    res.status(200).json({
      statusCode: 200,
      message: req.t('permission_fetch_message'),
      data: permissions,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      data: error,
    });
  }
};

const getOnePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const permissions = await permission.findOne({
      where: { id },
    });
    if (permissions) {
      return res.status(200).json({
        statusCode: 200,
        message: req.t('permission_fetch_message'),
        data: permissions,
      });
    }
    res.status(404).json({
      statusCode: 404,
      message: req.t('id_unexist_message'),
    });
  } catch (error) {
    return res.status(400).json({ statusCode: 400, data: error });
  }
};

const deleteOnePermission = async (req, res) => {
  const { id } = req.params;
  const Permission = await permission.findOne({
    where: { id },
  });
  try {
    if (Permission) {
      await permission.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: req.t('permission_delete_message'),
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: req.t('id_unexist_message'),
      });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, data: error });
  }
};

const updateOnePermission = async (req, res) => {
  const { id } = req.params;
  const Permission = await permission.findOne({
    where: { id },
  });
  const { permissionName, description } = req.body;
  try {
    if (!Permission) {
      return res.status(404).json({
        statusCode: 404,
        message: req.t('id_unexist_message'),
      });
    }
    await permission.update(
      { permissionName, description },
      {
        where: { id },
      },
    );
    return res.status(201).json({
      statusCode: 201,
      message: req.t('permission_update_message'),
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: req.t('server_error_message'),
    });
  }
};
const setPermission = async (req, res) => {
  const rolePermissionData = {
    roleId: req.body.roleId,
    permissionId: req.body.permissionId,
  };
  try {
    const rolePermissions = await rolepermission.create(rolePermissionData);
    return res.status(201).json({
      statusCode: 201,
      message: req.t('set_permission_message'),
      response: rolePermissions,
    });
  } catch (error) {
    return res.status(500).json({ message: req.t('server_error_message') });
  }
};

const getRoleWithPermission = async (req, res) => {
  try {
    const RoleWithPermission = await rolepermission.findAll({ include: [role, permission] });
    res.status(200).json({ statusCode: 200, data: RoleWithPermission });
  } catch (error) {
    res.status(400).json({ statusCode: 400, data: error });
  }
};
const getoneRoleWithPermission = async (req, res) => {
  const { id } = req.params;
  try {
    const RoleWithPermission = await rolepermission.findOne({
      where: { id },
    });
    if (RoleWithPermission) {
      res.status(200).json({ statusCode: 200, data: RoleWithPermission });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: req.t('id_unexist_message'),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: req.t('server_error_message') });
  }
};
const updateRoleWithPermission = async (req, res) => {
  const { id } = req.params;
  const RoleWithPermission = await rolepermission.findOne({
    where: { id },
  });
  const { roleId, permissionId } = req.body;
  try {
    if (!RoleWithPermission) {
      return res.status(404).json({
        statusCode: 404,
        message: req.t('id_unexist_message'),
      });
    }
    await rolepermission.update(
      { roleId, permissionId },
      {
        where: { id },
      },
    );
    return res.status(201).json({
      statusCode: 201,
      message: req.t('update_message'),
      data: RoleWithPermission,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 400,
      message: req.t('server_error_message'),
    });
  }
};
const deleteRoleWithPermission = async (req, res) => {
  const { id } = req.params;
  const RoleWithPermission = await rolepermission.findOne({
    where: { id },
  });
  try {
    if (RoleWithPermission) {
      await rolepermission.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: req.t('delete_message'),
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: req.t('id_unexist_message'),
      });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, data: error });
  }
};

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
  deleteRoleWithPermission,
};
