"use client";

import dynamic from "next/dynamic";
import { useSearchParams, useParams } from "next/navigation";

const ApplicationDetails = dynamic(() => import("../../../components/ApplicationDetails"), {
  loading: () => <div className="detail-card">Loading detail view...</div>
});

export default function ApplicationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  return <main className="detail-shell">
    <div className="detail-top"><span className="brand-mark small">ML</span><strong>Meridian Finance</strong></div>
    {!token ? <div className="detail-card"><h1>Session required</h1><p className="muted">Please sign in to view this application.</p><a href="/">Go to sign in</a></div> : <ApplicationDetails id={params.id} token={token} />}
  </main>;
}
