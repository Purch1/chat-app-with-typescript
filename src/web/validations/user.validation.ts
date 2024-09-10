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

// Update 
export const updateUserPayload = z.object({
  fullName: nameRule,
  email: emailRule
});

export const updateUserValidator = incomingRequestRule(createUserPayload, emptyObjectRule, emptyObjectRule);

export type TUpdateUserPayload = z.infer<typeof createUserPayload>;

// Get User By Id
export const getByIdPayload = z.object({
  userId: objectIdRule,
});

export const getUserByIdValidator = incomingRequestRule(emptyObjectRule, getByIdPayload, emptyObjectRule);

// Delete User
export const deleteUserPayload = z.object({
  userId: objectIdRule,
});
export const deleteUserValidator = incomingRequestRule(emptyObjectRule, deleteUserPayload, emptyObjectRule);
