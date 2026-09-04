import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { ApprovalBar } from "@/components/approval-bar";
import { getDrafts, getInbox, getEstimateRequests } from "@/lib/data";
import { formatDate } from "@/lib/money";
import { gmail } from "@/lib/integrations/gmail";

export const dynamic = "force-dynamic";
export const metadata = { title: "Inbox & Drafts" };

export default async function InboxPage() {
  const [messages, drafts, requests] = await Promise.all([
    getInbox(),
    getDrafts(),
    getEstimateRequests(),
  ]);

  return (
    <>
      <PageHeader
        title="Inbox & drafts"
        subtitle="Everything the agents write stops here. Nothing leaves the building without a human pressing Send."
        right={
          <Badge variant={gmail.isConfigured() ? "default" : "muted"}>
            Gmail {gmail.isConfigured() ? "configured" : "not connected"}
          </Badge>
        }
      />

      <div className="grid gap-6">
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">Drafts queue</h2>
          {drafts.length === 0 ? (
            <EmptyState
              title="No drafts waiting."
              hint="Sara, Emma, and Taylor write here. A draft sits until someone approves it."
            />
          ) : (
            <div className="grid gap-3">
              {drafts.map((d) => (
                <Card key={d.id}>
                  <div className="flex flex-wrap items-start justify-between gap-2 p-5 pb-3">
                    <div>
                      <p className="font-extrabold">{d.subject}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {d.agent} · {d.kind.replace(/_/g, " ")}
                        {d.recipient ? ` · to ${d.recipient}` : ""}
                        {d.project ? ` · ${d.project.code}` : ""}
                      </p>
                    </div>
                    <Badge variant={d.status === "APPROVED" ? "default" : "accent"}>{d.status}</Badge>
                  </div>
                  <div className="whitespace-pre-wrap px-5 pb-4 text-sm">{d.body}</div>
                  <ApprovalBar />
                </Card>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">Office inbox</h2>
          {messages.length === 0 ? (
            <EmptyState
              title="Inbox is not connected."
              hint="Gmail is stubbed. Once a human wires it, mail lands here and Sara routes it to Emma or Taylor."
            />
          ) : (
            <Card>
              <ul className="divide-y divide-[var(--border)]">
                {messages.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-baseline justify-between gap-2 p-4">
                    <div>
                      <p className="font-semibold">{m.subject}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {m.fromName} &lt;{m.fromEmail}&gt; · {formatDate(m.receivedAt)}
                      </p>
                    </div>
                    <Badge variant="muted">{m.routedTo ?? m.status}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">
            Estimate requests from the website
          </h2>
          {requests.length === 0 ? (
            <EmptyState title="No requests yet." hint="Submissions from /contact land here." />
          ) : (
            <Card>
              <ul className="divide-y divide-[var(--border)]">
                {requests.map((r) => (
                  <li key={r.id} className="p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">
                        {r.name}
                        {r.company ? ` · ${r.company}` : ""}
                      </p>
                      <Badge variant={r.handled ? "muted" : "accent"}>
                        {r.handled ? "handled" : "new"}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {r.email}
                      {r.phone ? ` · ${r.phone}` : ""}
                      {r.location ? ` · ${r.location}` : ""} · {formatDate(r.createdAt)}
                    </p>
                    <p className="mt-2 text-sm">{r.scope}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>
      </div>
    </>
  );
}
