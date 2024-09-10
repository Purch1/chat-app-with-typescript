import { z } from 'zod';
import { Gender } from '@src/contract/enums/UserType';
import { Types } from 'mongoose';

export const emailRule = z.string().toLowerCase().email().max(64);

export const emptyObjectRule = z.object({}).strict();

export const genderRule = z.nativeEnum(Gender);

export const incomingRequestRule = (body: z.AnyZodObject, params: z.AnyZodObject, query: z.AnyZodObject) =>
  z.object({ body, params, query });

export const nameRule = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(255)
  .refine((value) => value !== 'null', { message: "name cannot be 'null'" });

export const objectIdRule = z
  .string()
  .trim()
  .refine((value) => Types.ObjectId.isValid(value), { message: 'invalid objectId' });

export const passwordRule = z
  .string()
  .trim()
  .regex(/[A-Z]{1,}/g, { message: 'Password must contain at least one uppercase character.' })
  .regex(/[0-1]{1,}/g, { message: 'Password must contain at least 1 number.' })
  .regex(/[!@#$%^&*()-+=`~:;"'><,.]{1,}/g, {
    message: 'Password must contain at least 1 special character.'
  })
  .min(8)
  .max(256);

export const usernameRule = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z]\w{2,19}$/);

export const urlRule = z.string().url();
