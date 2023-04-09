import { user } from "../../database/models";
const confirmEmail = async (req, res) => {
  const { confirmationCode } = req.params;
  try {
    const newUser = await user.findOne({ where: { confirmationCode } });
    if (!newUser) {
      return res.status(404).send("User not found");
    }
    if (user.confirmed) {
      return res
        .status(400)
        .send(
          "Welcome to the E-commerce App. Your account has been confirmed, and We appreciate you choosing to make purchases using our app."
        );
    }

    await user.update({ confirmed: true });
    res
      .status(200)
      .send(
        "Welcome to the E-commerce App. Your account has been confirmed, and we appreciate you choosing to make purchases using our app."
      );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export default { confirmEmail };
