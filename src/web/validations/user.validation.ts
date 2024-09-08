import { z } from 'zod';
import { emailRule, emptyObjectRule, genderRule, incomingRequestRule, nameRule, passwordRule, usernameRule } from './lib/validation.rules';

export const createUserPayload = z.object({
  fullName: nameRule,
  username: usernameRule,
  email: emailRule,
  password: passwordRule,
  gender: genderRule
});

export const createUserValidator = incomingRequestRule(
    createUserPayload,
    emptyObjectRule,
    emptyObjectRule
)


export type TCreateUserPayload = z.infer<typeof createUserPayload>;
