'use server';
/**
 * @fileOverview A flow for handling live chat conversations.
 *
 * - generateChatResponse - A function that generates a response from a support agent.
 * - GenerateChatResponseInput - The input type for the function.
 * - GenerateChatResponseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChatResponseInputSchema = z.object({
  message: z.string().describe('The user\'s message to the support agent.'),
});
export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe('The support agent\'s response.'),
});
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;

export async function generateChatResponse(input: GenerateChatResponseInput): Promise<GenerateChatResponseOutput> {
  return liveChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveChatPrompt',
  input: {schema: GenerateChatResponseInputSchema},
  output: {schema: GenerateChatResponseOutputSchema},
  prompt: `You are a friendly and helpful customer support agent for DemandHub, a digital asset recovery company. Your goal is to assist users with their questions and concerns. Keep your responses concise and helpful.

User's message: {{{message}}}`,
});

const liveChatFlow = ai.defineFlow(
  {
    name: 'liveChatFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);

    if (output) {
      return output;
    }

    // Fallback in case the prompt fails
    return {
      response: 'I\'m sorry, I\'m having trouble connecting. Please try again in a moment.',
    };
  }
);
