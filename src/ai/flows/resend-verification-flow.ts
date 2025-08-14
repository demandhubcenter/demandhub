
/**
 * @fileOverview A flow for resending a verification email.
 *
 * - resendVerificationEmail - A function that handles the email resend process.
 * - ResendVerificationEmailInput - The input type for the function.
 * - ResendVerificationEmailOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

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

const resendVerificationEmailFlow = ai.defineFlow(
  {
    name: 'resendVerificationEmailFlow',
    inputSchema: ResendVerificationEmailInputSchema,
    outputSchema: ResendVerificationEmailOutputSchema,
  },
  async (input) => {
    try {
      if (!auth.currentUser) {
        // This is a server-side check. The user object might not be available
        // in the same way as the client. It's better to rely on client-side state
        // for the current user, but this flow is designed to be called securely.
        // For this implementation, we will proceed assuming the client has validated the user state.
        console.log("Attempted to resend verification for a non-logged-in user session.");
      }
      
      // The auth object is shared, so if a user is signed in on the client,
      // auth.currentUser should be populated here if running in the same context.
      const currentUser = auth.currentUser;
      if (currentUser) {
        await sendEmailVerification(currentUser);
        return {
          success: true,
          message: `A new verification link has been sent to ${input.email}.`,
        };
      } else {
         return {
          success: false,
          message: `No active user session found. Please sign in again.`,
        };
      }

    } catch (error: any) {
      console.error("Error resending verification email:", error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred.',
      };
    }
  }
);
