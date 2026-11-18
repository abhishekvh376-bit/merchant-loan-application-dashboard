"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";

const money = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(amount);

export default function DashboardPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("admin@merchant.com");
  const [password, setPassword] = useState("Password123!");
  const [loginError, setLoginError] = useState("");
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();
    setLoginError("");
    try {
      const result = await apiRequest("/auth/login", {
        method: "POST", body: JSON.stringify({ email, password })
      });
      setToken(result.token);
    } catch (err) { setLoginError(err.message); }
  }

  useEffect(() => {
    if (!token) return;
    let active = true;
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), limit: "8", search, status });
    apiRequest(`/applications?${params}`, { token })
      .then((result) => {
        if (active) { setApplications(result.data); setPagination(result.pagination); }
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [token, page, search, status]);

  const stats = useMemo(() => ({
    total: pagination.total,
    approved: applications.filter((item) => item.status === "Approved").length,
    review: applications.filter((item) => item.status === "Under Review").length,
    pending: applications.filter((item) => item.status === "Pending").length
  }), [applications, pagination.total]);

  if (!token) return (
    <main className="login-shell">
      <section className="login-card">
        <div className="brand-mark">ML</div>
        <p className="eyebrow">MERCHANT FINANCE</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to manage loan applications.</p>
        <form onSubmit={login} className="login-form">
          <label>Email address<input aria-label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          {loginError && <p className="error">{loginError}</p>}
          <button className="primary-button" type="submit">Sign in</button>
        </form>
        <p className="hint">Demo: admin@merchant.com · Password123!</p>
      </section>
    </main>
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark small">ML</span><strong>Meridian<span>Finance</span></strong></div>
        <p className="nav-label">WORKSPACE</p>
        <div className="nav-item active">▦ <span>Applications</span></div>
        <div className="nav-item">◷ <span>Repayments</span></div>
        <div className="nav-item">▤ <span>Reports</span></div>
        <div className="sidebar-bottom"><div className="avatar">DA</div><div><strong>Demo Admin</strong><small>Administrator</small></div><button className="logout" onClick={() => setToken("")} aria-label="Sign out">↪</button></div>
      </aside>
      <section className="main-panel">
        <header className="topbar"><div><span className="breadcrumb">Workspace /</span> Applications</div><div className="top-user"><span className="online-dot" /> System operational <div className="avatar">DA</div></div></header>
        <div className="content">
          <div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>Loan applications</h1><p className="muted">Track and manage merchant funding requests.</p></div><button className="outline-button" onClick={() => { setSearch(""); setStatus("All"); setPage(1); }}>↻ Reset filters</button></div>
          <div className="stat-grid">
            <article className="stat-card"><span className="stat-icon purple">▦</span><p>Total applications</p><strong>{stats.total}</strong><small>Matching current filters</small></article>
            <article className="stat-card"><span className="stat-icon green">✓</span><p>Approved on this page</p><strong>{stats.approved}</strong><small>Ready for disbursement</small></article>
            <article className="stat-card"><span className="stat-icon amber">◷</span><p>Under review</p><strong>{stats.review}</strong><small>Awaiting assessment</small></article>
            <article className="stat-card"><span className="stat-icon blue">…</span><p>Pending</p><strong>{stats.pending}</strong><small>Action may be required</small></article>
          </div>
          <section className="table-card">
            <div className="table-heading"><div><h2>All applications</h2><p className="muted">A live view of merchant loan requests</p></div><span className="count-pill">{pagination.total} records</span></div>
            <div className="filters"><div className="search-box">⌕ <input aria-label="Search applications" placeholder="Search merchant, contact or ID..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></div><select aria-label="Filter by status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}><option>All</option><option>Pending</option><option>Under Review</option><option>Approved</option><option>Rejected</option></select></div>
            {error && <p className="error pad">{error}</p>}
            <div className="table-wrap"><table><thead><tr><th>APPLICATION ID</th><th>MERCHANT</th><th>CONTACT PERSON</th><th>LOAN AMOUNT</th><th>SUBMITTED</th><th>STATUS</th><th /></tr></thead>
              <tbody>{loading ? <tr><td colSpan="7" className="empty">Loading applications...</td></tr> : applications.length ? applications.map((item) => <tr key={item.id}><td><a className="app-id" href={`/applications/${item.id}?token=${encodeURIComponent(token)}`}>{item.id}</a></td><td><strong>{item.merchant}</strong></td><td>{item.contact}</td><td className="amount">{money(item.amount)}</td><td>{new Date(item.submittedAt + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td><td><span className={`status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span></td><td><a className="view-link" href={`/applications/${item.id}?token=${encodeURIComponent(token)}`} aria-label={`View ${item.id}`}>→</a></td></tr>) : <tr><td colSpan="7" className="empty">No applications match your filters.</td></tr>}</tbody>
            </table></div>
            <div className="pagination"><span>Showing {applications.length ? (page - 1) * 8 + 1 : 0}–{Math.min(page * 8, pagination.total)} of {pagination.total}</span><div><button disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>Previous</button><span className="page-number">{page} / {pagination.totalPages}</span><button disabled={page >= pagination.totalPages || loading} onClick={() => setPage((p) => p + 1)}>Next</button></div></div>
          </section>
          <footer>© 2026 Meridian Finance <span>Secure merchant lending workspace</span></footer>
        </div>
      </section>
    </main>
  );
}
