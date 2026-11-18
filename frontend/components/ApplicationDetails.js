"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function ApplicationDetails({ id, token }) {
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiRequest(`/applications/${encodeURIComponent(id)}`, { token })
      .then((result) => setItem(result.data))
      .catch((err) => setError(err.message));
  }, [id, token]);

  if (error) return <div className="detail-card"><p className="error">{error}</p><a href="/">Back to dashboard</a></div>;
  if (!item) return <div className="detail-card">Loading application details...</div>;
  return <div className="detail-card">
    <a href="/" className="back-link">← Back to applications</a>
    <p className="eyebrow">APPLICATION DETAILS</p>
    <h1>{item.merchant}</h1><p className="muted">{item.id}</p>
    <div className="detail-amount">{money(item.amount)}</div>
    <span className={`status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>
    <div className="detail-grid">
      <div><small>Contact person</small><strong>{item.contact}</strong></div>
      <div><small>Email</small><strong>{item.email}</strong></div>
      <div><small>Phone</small><strong>{item.phone}</strong></div>
      <div><small>Submitted on</small><strong>{item.submittedAt}</strong></div>
      <div><small>Loan purpose</small><strong>{item.purpose}</strong></div>
      <div><small>Tenure</small><strong>{item.tenureMonths} months</strong></div>
    </div>
  </div>;
}
