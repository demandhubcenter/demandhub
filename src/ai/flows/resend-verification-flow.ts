
'use server';
/**
 * @fileOverview A flow for resending a verification email.
 *
 * - resendVerificationEmail - A function that handles the email resend process.
 * - ResendVerificationEmailInput - The input type for the function.
 * - ResendVerificationEmailOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResendVerificationEmailInputSchema = z.object({
  email: z.string().email().describe('The email address to send the verification link to.'),
});
export type ResendVerificationEmailInput = z.infer<typeof ResendVerificationEmailInputSchema>;

const ResendVerificationEmailOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ResendVerificationEmailOutput = z.infer<typeof ResendVerificationEmailOutputSchema>;

export async function resendVerificationEmail(input: ResendVerificationEmailInput): Promise<ResendVerificationEmailOutput> {
  return resendVerificationEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resendVerificationEmailPrompt',
  input: {schema: ResendVerificationEmailInputSchema},
  output: {schema: ResendVerificationEmailOutputSchema},
  prompt: `You are an email verification service. A user with email {{{email}}} has requested to resend their verification link. 
  
  Please confirm that the action has been completed.
  
  In a real application, this would trigger an email sending service. For this simulation, just return a success message.`,
});

const resendVerificationEmailFlow = ai.defineFlow(
  {
    name: 'resendVerificationEmailFlow',
    inputSchema: ResendVerificationEmailInputSchema,
    outputSchema: ResendVerificationEmailOutputSchema,
  },
  async (input) => {
    // In a real application, you would integrate with an email service provider
    // like SendGrid, Mailgun, etc., to send the actual email.
    console.log(`Simulating sending verification email to ${input.email}`);
    
    // For now, we'll just use a prompt to simulate the confirmation.
    const {output} = await prompt(input);

    if (output) {
      return output;
    }

    // Fallback in case the prompt fails
    return {
      success: true,
      message: `Verification link sent to ${input.email}.`,
    };
  }
);
