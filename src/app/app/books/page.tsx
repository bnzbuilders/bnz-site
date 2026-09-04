import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { getBills, getLiveProjects } from "@/lib/data";
import { formatCents, formatDate } from "@/lib/money";
import { quickbooks } from "@/lib/integrations/quickbooks";

export const dynamic = "force-dynamic";
export const metadata = { title: "Books" };

export default async function BooksPage() {
  const [projects, bills] = await Promise.all([getLiveProjects(), getBills()]);

  return (
    <>
      <PageHeader
        title="Books / job cost"
        subtitle="Emma's workspace. One ledger per job — costs never cross between them."
        right={
          <Badge variant={quickbooks.isConfigured() ? "default" : "muted"}>
            QuickBooks {quickbooks.isConfigured() ? "configured" : "not connected"}
          </Badge>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.code} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link href={`/app/projects/${p.code}`} className="font-extrabold hover:underline">
                  {p.name}
                </Link>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {p.poNumber ? `PO ${p.poNumber}` : "No PO on file"}
                </p>
              </div>
              <Badge variant="muted">{p.code}</Badge>
            </div>

            <Table className="mt-4">
              <THead>
                <TR>
                  <TH>Vendor</TH>
                  <TH>Category</TH>
                  <TH className="text-right">Amount</TH>
                </TR>
              </THead>
              <TBody>
                {p.costs.length === 0 ? (
                  <TR>
                    <TD colSpan={3} className="text-sm text-[var(--muted-foreground)]">
                      $0.00 posted. No receipts on file for this job.
                    </TD>
                  </TR>
                ) : (
                  p.costs.map((c) => (
                    <TR key={c.id}>
                      <TD className="font-semibold">{c.vendor}</TD>
                      <TD>{c.category}</TD>
                      <TD className="text-right font-extrabold tabular-nums">
                        {formatCents(c.amountCents)}
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>

            <div className="mt-3 flex items-baseline justify-between border-t border-[var(--border)] pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
                {p.code} posted to date
              </span>
              <span className="font-extrabold tabular-nums">{formatCents(p.spentCents)}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">Payables</h2>
        {bills.length === 0 ? (
          <EmptyState
            title="No bills posted."
            hint="Bills land here from QuickBooks once a human connects the account, or by hand off a real invoice."
          />
        ) : (
          <Card>
            <Table>
              <THead>
                <TR>
                  <TH>Job</TH>
                  <TH>Vendor</TH>
                  <TH>Invoice</TH>
                  <TH>Due</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Amount</TH>
                </TR>
              </THead>
              <TBody>
                {bills.map((b) => (
                  <TR key={b.id}>
                    <TD className="font-semibold">{b.project.code}</TD>
                    <TD>{b.vendor}</TD>
                    <TD>{b.invoiceNumber ?? "—"}</TD>
                    <TD>{formatDate(b.dueOn)}</TD>
                    <TD>
                      <Badge variant="muted">{b.status}</Badge>
                    </TD>
                    <TD className="text-right font-extrabold tabular-nums">
                      {formatCents(b.amountCents)}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </Card>
        )}
      </div>
    </>
  );
}
