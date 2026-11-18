const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const xss = require("xss");
const applications = require("./data/applications");
const { requireAuth } = require("./middleware/auth");

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "20kb" }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/auth/login", (req, res) => {
  const email = xss(String(req.body?.email || "").trim()).toLowerCase();
  const password = String(req.body?.password || "");
  if (email !== "admin@merchant.com" || password !== "Password123!") {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { sub: "demo-admin", email, role: "admin" },
    process.env.JWT_SECRET || "dev-only-secret-change-me",
    { expiresIn: "4h" }
  );
  return res.json({ token, user: { email, name: "Demo Admin" } });
});

app.get("/api/applications", requireAuth, (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 8));
  const search = xss(String(req.query.search || "")).toLowerCase().trim();
  const status = xss(String(req.query.status || "")).trim();
  const filtered = applications.filter((item) => {
    const matchesSearch = !search || [item.id, item.merchant, item.contact]
      .some((value) => value.toLowerCase().includes(search));
    return matchesSearch && (!status || status === "All" || item.status === status);
  });
  const start = (page - 1) * limit;
  res.json({
    data: filtered.slice(start, start + limit),
    pagination: { page, limit, total: filtered.length, totalPages: Math.max(1, Math.ceil(filtered.length / limit)) }
  });
});

app.get("/api/applications/:id", requireAuth, (req, res) => {
  const item = applications.find((application) => application.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Application not found" });
  res.json({ data: item });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
