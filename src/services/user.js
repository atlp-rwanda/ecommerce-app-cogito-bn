// import db from "../database/models/index.js";

// const registerGoogle = async (data) => {
//   try {
//     const User = await db.user.create(data);
//     return User;
//   } catch (error) {
//     console.log(error.message);
//     throw new Error("Could not create user");
    
//   }
// };
// //getUserByEmail
// const getUserByEmail = async (email) => {
//   try {
//     const User = await db.user.findOne({
//       where: {
//         email: email,
//       },
//     });
//     return User;
//   } catch (error) {
//     throw new Error("Could not find user");
//   }
// };

// export { registerGoogle, getUserByEmail };