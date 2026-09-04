import { NotWiredError } from "./errors";

/** QuickBooks stub. Emma's ledger source once a human connects the account. */
export type QboBill = {
  id: string;
  vendor: string;
  invoiceNumber: string | null;
  amountCents: number;
  dueOn: Date | null;
  projectRef: string | null;
};

export const quickbooks = {
  isConfigured(): boolean {
    return Boolean(process.env.QUICKBOOKS_CLIENT_ID && process.env.QUICKBOOKS_CLIENT_SECRET);
  },
  async listUnpaidBills(): Promise<QboBill[]> {
    throw new NotWiredError("QuickBooks");
  },
  /** Job-cost actuals for ONE project. Never call this without a project. */
  async listCostsForProject(_projectCode: string): Promise<never> {
    throw new NotWiredError("QuickBooks");
  },
};
