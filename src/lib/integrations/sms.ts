import { NotWiredError } from "./errors";

/** SMS stub. Sub reminders only, and only after a human approves the text. */
export const sms = {
  isConfigured(): boolean {
    return Boolean(process.env.SMS_ACCOUNT_SID && process.env.SMS_AUTH_TOKEN);
  },
  async send(_input: { to: string; body: string }): Promise<void> {
    throw new NotWiredError("SMS");
  },
};
