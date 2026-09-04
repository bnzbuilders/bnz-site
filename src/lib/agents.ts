/**
 * Agent lanes. These are locked. An agent page must refuse work outside its
 * lane and hand it to the right teammate instead.
 */
export type AgentKey = "sara" | "emma" | "taylor";

export type AgentLane = {
  key: AgentKey;
  name: string;
  role: string;
  reportsTo: string | null;
  owns: string[];
  neverDoes: string[];
  href: string;
};

export const AGENTS: Record<AgentKey, AgentLane> = {
  sara: {
    key: "sara",
    name: "Sara Cooper",
    role: "Project Manager / ops lead",
    reportsTo: null,
    owns: [
      "Projects and schedule",
      "RFQs and procurement calls",
      "Client communication",
      "Inbox triage and routing",
      "Approves what Emma and Taylor draft",
    ],
    neverDoes: ["Nothing sends without her SEND or APPROVE"],
    href: "/app/sara",
  },
  emma: {
    key: "emma",
    name: "Emma",
    role: "Company Accountant + Subcontractor Outreach",
    reportsTo: "Sara Cooper",
    owns: [
      "QuickBooks, receipts, job-cost ledger",
      "Bills and payables",
      "1099s and W-9s",
      "COI chase and sub status",
      "Drafts Sara's morning money email",
    ],
    neverDoes: ["Does not estimate", "Does not do brand or marketing"],
    href: "/app/emma",
  },
  taylor: {
    key: "taylor",
    name: "Taylor",
    role: "Master Estimator",
    reportsTo: "Sara Cooper",
    owns: [
      "Takeoff and quantities",
      "Unit rates, burden, prevailing wage",
      "Allowances and contingency",
      "Bid worksheet and go/no-go",
    ],
    neverDoes: [
      "Never a reckless lowball",
      "Does not run the books",
      "Does not do sub outreach",
    ],
    href: "/app/taylor",
  },
};

export const AGENT_LIST = [AGENTS.sara, AGENTS.emma, AGENTS.taylor];
