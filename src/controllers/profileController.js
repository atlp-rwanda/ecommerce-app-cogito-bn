import { user } from '../database/models';

const isUserExist = async (req, res, next) => {
  const { id } = req.params;
  const profile = await user.findByPk(id);
  if (!profile) {
    res
      .status(404)
      .json({ status: 404, message: `user with the id ${id} does not exist`, data: [] });
  }
  next();
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await user.findByPk(id);
  return res
    .status(200)
    .json({ status: 200, message: 'Profile fetched successfully', data: [profile] });
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await user.update(req.body, {
      where: { id },
      returning: true,
    });
    return res
      .status(200)
      .json({ status: 200, message: 'Profile updated successfully.', data: updatedProfile[1] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: error.message, data: [] });
  }
};

export default { getProfile, updateProfile, isUserExist };
