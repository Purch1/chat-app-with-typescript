import { z } from 'zod';
import { incomingRequestRule, emptyObjectRule, stringArrayRule } from './lib/validation.rules';

// Create Conversation
export const createConversationPayload = z.object({
    participants: stringArrayRule,
    messages: stringArrayRule,
});

export const createConversationValidator = incomingRequestRule(createConversationPayload, emptyObjectRule, emptyObjectRule);

export type TCreateConversationPayload = z.infer<typeof createConversationPayload>;


