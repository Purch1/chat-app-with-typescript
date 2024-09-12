import { z } from 'zod';
import { objectIdRule, incomingRequestRule, emptyObjectRule, stringRule } from './lib/validation.rules';

// Create Message
export const createMessagePayload = z.object({
  senderId: stringRule,
  receiverId: stringRule,
  content: stringRule
});

export const createMessageValidator = incomingRequestRule(createMessagePayload, emptyObjectRule, emptyObjectRule);

export type TCreateMessagePayload = z.infer<typeof createMessagePayload>;

// Send Message
export const sendMessagePayload = z.object({
  content: stringRule
});

export const sendMessageValidator = incomingRequestRule(sendMessagePayload, emptyObjectRule, emptyObjectRule);

export type TSendMessagePayload = z.infer<typeof sendMessagePayload>;

// Update Message
export const updateMessagePayload = z.object({
  content: stringRule
});

export const updateMessageValidator = incomingRequestRule(updateMessagePayload, emptyObjectRule, emptyObjectRule);

export type TUpdateMessagePayload = z.infer<typeof updateMessagePayload>;

// Get Messages by User
export const getMessagesByUserPayload = z.object({
  userId: objectIdRule
});

export const getMessagesByUserValidator = incomingRequestRule(
  emptyObjectRule,
  getMessagesByUserPayload,
  emptyObjectRule
);

// Delete Message
export const deleteMessagePayload = z.object({
  messageId: objectIdRule
});

export const deleteMessageValidator = incomingRequestRule(emptyObjectRule, deleteMessagePayload, emptyObjectRule);
