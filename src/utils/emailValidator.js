// import dns from 'dns';

// export default async function isEmailReachable(email) {
//   const domain = email.split('@')[1];

//   try {
//     const addresses = await dns.promises.resolveMx(domain);
//     if (addresses.length > 0) {
//       return true;
//     }
//     return false;
//   } catch (err) {
//     return false;
//   }
// }

import emailValidator from 'deep-email-validator';

export default async function isEmailReachable(email) {
  return emailValidator.validate(email);
}
