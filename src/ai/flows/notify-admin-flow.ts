
'use server';
/**
 * @fileOverview A flow for notifying an admin via Telegram about a new case.
 *
 * - notifyAdminOnNewCase - A function that handles sending the Telegram message.
 * - NotifyAdminInput - The input type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import "dotenv/config";

const NotifyAdminInputSchema = z.object({
  caseId: z.string().describe("The ID of the new case."),
  caseTitle: z.string().describe("The title of the new case."),
  caseCategory: z.string().describe("The category of the new case."),
  caseDescription: z.string().describe("The description of the new case."),
  userName: z.string().describe("The full name of the user who submitted the case."),
  userCountry: z.string().describe("The country of the user."),
  userPhone: z.string().describe("The phone number of the user."),
  evidenceDataUrl: z.string().optional().describe("The data URL of the uploaded evidence file."),
  evidenceFileName: z.string().optional().describe("The name of the evidence file."),
  evidenceFileType: z.string().optional().describe("The MIME type of the evidence file."),
});
export type NotifyAdminInput = z.infer<typeof NotifyAdminInputSchema>;

export async function notifyAdminOnNewCase(input: NotifyAdminInput): Promise<void> {
  return notifyAdminFlow(input);
}

const notifyAdminFlow = ai.defineFlow(
  {
    name: 'notifyAdminFlow',
    inputSchema: NotifyAdminInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram bot token or chat ID is not configured.");
      return;
    }

    const messageText = `
🚨 *New Case Submitted* 🚨

*Case ID:* ${input.caseId}
*Case Title:* ${input.caseTitle}
*Category:* ${input.caseCategory}

*User Name:* ${input.userName}
*Country:* ${input.userCountry}
*Phone:* ${input.userPhone}

*Description:*
${input.caseDescription}
    `;

    // If there is evidence, send it first
    if (input.evidenceDataUrl && input.evidenceFileName && input.evidenceFileType) {
        try {
            const isImage = input.evidenceFileType.startsWith('image/');
            const endpoint = isImage ? 'sendPhoto' : 'sendDocument';
            const url = `https://api.telegram.org/bot${botToken}/${endpoint}`;
            
            const base64Data = input.evidenceDataUrl.split(',')[1];
            const fileBuffer = Buffer.from(base64Data, 'base64');

            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append(isImage ? 'photo' : 'document', new Blob([fileBuffer]), input.evidenceFileName);

            const fileResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const fileResponseData = await fileResponse.json();
            if (!fileResponseData.ok) {
                console.error("Failed to send Telegram file:", fileResponseData);
            } else {
                 console.log("Evidence file sent successfully.");
            }
        } catch(error) {
             console.error("Error sending Telegram file:", error);
        }
    }


    const textUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      const response = await fetch(textUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      });

      const responseData = await response.json();
      if (!responseData.ok) {
        console.error("Failed to send Telegram message:", responseData);
      } else {
        console.log("Admin notification sent successfully.");
      }
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
  }
);
