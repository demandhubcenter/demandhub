'use server';
/**
 * @fileOverview A flow for handling user sign-up and sending a verification email.
 *
 * - signUpUser - A function that handles the user sign-up process.
 * - SignUpUserInput - The input type for the function.
 * - SignUpUserOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SignUpUserInputSchema = z.object({
  fullName: z.string().min(2).describe('The full name of the user.'),
  email: z.string().email().describe('The email address for the new account.'),
});
export type SignUpUserInput = z.infer<typeof SignUpUserInputSchema>;

const SignUpUserOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SignUpUserOutput = z.infer<typeof SignUpUserOutputSchema>;

export async function signUpUser(input: SignUpUserInput): Promise<SignUpUserOutput> {
  return signUpUserFlow(input);
}

const prompt = ai.definePrompt({
  name: 'signUpUserPrompt',
  input: {schema: SignUpUserInputSchema},
  output: {schema: SignUpUserOutputSchema},
  prompt: `You are a user account service. A new user with name {{{fullName}}} and email {{{email}}} has just signed up. 
  
  Please confirm that their account has been created and that a verification link has been sent.
  
  In a real application, this would trigger an email sending service. For this simulation, just return a success message confirming the email was sent.`,
});

const signUpUserFlow = ai.defineFlow(
  {
    name: 'signUpUserFlow',
    inputSchema: SignUpUserInputSchema,
    outputSchema: SignUpUserOutputSchema,
  },
  async (input) => {
    // In a real application, you would create the user in your database here.
    console.log(`Simulating account creation for ${input.email}`);

    // In a real application, you would integrate with an email service provider
    // to send the actual email with a unique verification token.
    console.log(`Simulating sending verification email to ${input.email}`);
    
    // For now, we'll just use a prompt to simulate the confirmation.
    const {output} = await prompt(input);

    if (output) {
      return output;
    }

    // Fallback in case the prompt fails
    return {
      success: true,
      message: `Account for ${input.email} created. Verification link sent.`,
    };
  }
);
