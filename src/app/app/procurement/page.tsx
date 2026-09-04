import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { getRfqs } from "@/lib/data";
import { formatCents, formatDate } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Procurement" };

export default async function ProcurementPage() {
  const rfqs = await getRfqs();

  return (
    <>
      <PageHeader
        title="Procurement / RFQs"
        subtitle="Sara owns the calls. Emma runs the outreach and chases paperwork. Every RFQ is tied to one job."
      />

      {rfqs.length === 0 ? (
        <EmptyState
          title="No RFQs out."
          hint="An RFQ needs a job, a trade, a scope, and a date. Draft one from the job page once the scope is set."
        />
      ) : (
        <Card>
          <Table>
            <THead>
              <TR>
                <TH>Job</TH>
                <TH>Trade</TH>
                <TH>Sub</TH>
                <TH>Due</TH>
                <TH>Status</TH>
                <TH className="text-right">Quote</TH>
              </TR>
            </THead>
            <TBody>
              {rfqs.map((r) => (
                <TR key={r.id}>
                  <TD className="font-semibold">{r.project.code}</TD>
                  <TD>{r.trade}</TD>
                  <TD>{r.sub?.name ?? "—"}</TD>
                  <TD>{formatDate(r.dueOn)}</TD>
                  <TD>
                    <Badge variant="muted">{r.status}</Badge>
                  </TD>
                  <TD className="text-right font-extrabold tabular-nums">{formatCents(r.quoteCents)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      )}
    </>
  );
}
