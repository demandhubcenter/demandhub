
'use server';
/**
 * @fileOverview A flow for notifying an admin via Telegram about a new case.
 *
 * - notifyAdminOnNewCase - A function that handles sending the Telegram message.
 * - NotifyAdminInput - The input type for the function.
 */
import 'dotenv/config';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import TelegramBot from 'node-telegram-bot-api';

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
      throw new Error("Server configuration error: Telegram is not set up.");
    }
    
    // Using 'polling: false' is recommended for server-side bots that only send messages.
    const bot = new TelegramBot(botToken, { polling: false });

    const messageText = `
🚨 *New Case Submitted* 🚨

*Case ID:* \`${input.caseId}\`
*Title:* ${input.caseTitle}
*Category:* ${input.caseCategory}
*User Name:* ${input.userName}
*Country:* ${input.userCountry}
*Phone:* \`${input.userPhone}\`

*Description:*
${input.caseDescription.substring(0, 2000)}
    `;

    try {
      // Send the text message first
      await bot.sendMessage(chatId, messageText, { parse_mode: 'Markdown' });
      console.log("Admin notification text sent successfully.");

      // If there is evidence, send it as a separate message
      if (input.evidenceDataUrl && input.evidenceFileName && input.evidenceFileType) {
          const base64Data = input.evidenceDataUrl.split(',')[1];
          const fileBuffer = Buffer.from(base64Data, 'base64');
          const isImage = input.evidenceFileType.startsWith('image/');
          
          const fileOptions = {
              filename: input.evidenceFileName,
              contentType: input.evidenceFileType,
          };

          if (isImage) {
              await bot.sendPhoto(chatId, fileBuffer, { caption: `Evidence for case ${input.caseId}` }, fileOptions);
              console.log("Evidence image sent successfully.");
          } else {
              await bot.sendDocument(chatId, fileBuffer, { caption: `Evidence for case ${input.caseId}` }, fileOptions);
              console.log("Evidence document sent successfully.");
          }
      }
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
      // We throw an error here to make it clear that the notification failed.
      // This can be caught by the calling function if needed.
      throw new Error("Failed to send Telegram notification.");
    }
  }
);
