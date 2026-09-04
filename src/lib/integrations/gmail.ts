import { NotWiredError } from "./errors";

/** Gmail stub. Read + draft only. Sending is a human action in the app. */
export type GmailMessage = {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  preview: string;
  receivedAt: Date;
};

export const gmail = {
  isConfigured(): boolean {
    return Boolean(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET);
  },
  async listInbox(): Promise<GmailMessage[]> {
    throw new NotWiredError("Gmail");
  },
  async createDraft(_input: { to: string; subject: string; body: string }): Promise<{ draftId: string }> {
    throw new NotWiredError("Gmail");
  },
  async send(_draftId: string): Promise<void> {
    throw new NotWiredError("Gmail");
  },
};
