import { user } from '../database/models';

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await user.findByPk(id);
    res.status(200).json({ status: 200, message: req.t('profile_fetch_message'), data: profile });
  } catch (error) {
    res.status(404).json({ status: error.status, message: error.message, data: {} });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await user.update(req.body, {
      where: { id },
      returning: true,
    });
    res
      .status(200)
      .json({ status: 200, message: req.t('profile_updated_message'), data: updatedProfile[1][0] });
  } catch (error) {
    res.status(error.status).json({ status: error.status, message: error.message, data: {} });
  }
};

export default { getProfile, updateProfile };
