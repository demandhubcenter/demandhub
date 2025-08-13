
'use server';

import { notifyAdminOnNewCase, NotifyAdminInput } from "@/ai/flows/notify-admin-flow";

export async function sendAdminNotification(input: NotifyAdminInput) {
    try {
        await notifyAdminOnNewCase(input);
        console.log("Admin notification triggered successfully.");
    } catch (error) {
        console.error("Error triggering admin notification flow:", error);
        // Optionally, you could re-throw or handle the error as needed
    }
}
