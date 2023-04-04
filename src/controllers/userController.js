import speakeasy from "speakeasy";
import twilio from "twilio";
import dotenv from "dotenv";
import User from "../database/models/user";

dotenv.config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, role } = req.body;
  if (!firstName || !lastName || !email || !password || !phone || !role) {
    return res.status(400).json({
      status: 400,
      message:
        "Please provide firstName, lastName, email, password, phone, and role to create a user!",
    });
  }

  const userExists = await User.findOne({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(409).json({
      status: 400,
      message: "An account with that email already exists!",
    });
  }

  try {
    // Generate a secret key for the user
    const { base32: secret } = speakeasy.generateSecret({ length: 20 });
    // Generate an OTP for the user
    const token = speakeasy.totp({
      secret,
      encoding: "base32",
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      secret,
    });
    console.log(`user created, token ${token}`);
    // Send SMS message to the user's phone number with the OTP
    // twilioClient.messages.create({
    //   to: phone,
    //   from: '+15017122661',
    //   body: `Your verification code is ${token}`,
    // });
    // twilioClient.verify.v2
    //   .services(process.env.TWILIO_SERVICE_ID)
    //   .verificationChecks.create({ to: phone, code: token })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    // .then(() => {
    //   const readline = require("readline").createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //   });
    //   readline.question("Please enter the OTP:", (otpCode) => {
    //     client.verify.v2
    //       .services(verifySid)
    //       .verificationChecks.create({ to: "+250780162353", code: otpCode })
    //       .then((verification_check) => console.log(verification_check.status))
    //       .then(() => readline.close());
    //   });
    // });

    const msg = `Your OTP verification for user ${firstName} ${lastName} is ${token}`;
    // const phn = 
    await twilioClient.messages
      .create({
        body: msg,
        from: process.env.TWILIO_NBR,
        // messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: phone,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
    
      // .then(() => {
      return res.status(201).json({
        status: 201,
        message: "New user created successfully",
        data: newUser,
        OTP: token,
      });
    
    // });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      Error: err.message,
    });
  }
};

export default createUser;
