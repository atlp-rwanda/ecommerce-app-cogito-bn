import { user } from "../database/models";
import eventEmitter from "../services/eventEmitter";

const passwordPrompt = async (req, res, next) => {
  const { email, password } = req.body;
  const User = await user.findOne({
    where: { email },
  });
  if (!User) {
    return res
      .status(400)
      .json({ status: 400, message: req.t("User does not exist Message") });
  }
  // console.log(password, user)

  const { PASSWORD_EXPIRED_DATE } = process.env;
  const currentTime = new Date();
  const lastDate = new Date(User.lastPasswordUpdate);
  const timeElapsed = (currentTime - lastDate) / (1000 * 60 * 60 * 24);
  if (timeElapsed >= PASSWORD_EXPIRED_DATE) {
    return res.status(201).json({
      status: 307,
      message: req.t("update_expired_password"),
    });
  }

  next();
};

export default { passwordPrompt };
