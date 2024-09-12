import { z } from 'zod';
import {
  emailRule,
  emptyObjectRule,
  genderRule,
  incomingRequestRule,
  nameRule,
  objectIdRule,
  passwordRule,
  usernameRule
} from './lib/validation.rules';


// Register
export const createUserPayload = z.object({
  fullName: nameRule,
  username: usernameRule,
  email: emailRule,
  password: passwordRule,
  gender: genderRule
});

export const createUserValidator = incomingRequestRule(createUserPayload, emptyObjectRule, emptyObjectRule);

export type TCreateUserPayload = z.infer<typeof createUserPayload>;

// Login
export const loginUserPayload = z.object({
  email: emailRule,
  password: passwordRule,
});

export const loginUserValidator = incomingRequestRule(loginUserPayload, emptyObjectRule, emptyObjectRule);

export type TLoginUserPayload = z.infer<typeof loginUserPayload>;

// // Logout
// export const logoutUserPayload = z.object({
//   email: emailRule,
// });

// export const logoutUserValidator = incomingRequestRule(logoutUserPayload, emptyObjectRule, emptyObjectRule);

// export type TLogoutUserPayload = z.infer<typeof logoutUserPayload>;

