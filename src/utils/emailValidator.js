import emailValidator from 'deep-email-validator';

export default async function isEmailReachable(email) {
  return emailValidator.validate(email);
}
