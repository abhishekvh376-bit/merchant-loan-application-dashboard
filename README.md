# Merchant Loan Application Dashboard

A full-stack demo application built with Next.js, React, Express, Jest, and Playwright.

## Features
- Login using a JWT-protected Express API
- Merchant loan application dashboard
- Server-side pagination, search, and status filtering
- Application detail view
- Lazy-loaded application detail component
- Input validation and XSS-safe text handling
- CORS and Helmet security headers
- Jest + Supertest API tests
- Playwright end-to-end login and dashboard test

## Requirements
- Node.js 20.9+ (recommended)
- npm 10+

## Run in Visual Studio Code
1. Open the `merchant-loan-dashboard` folder in VS Code (`File > Open Folder`).
2. Open the integrated terminal (`Terminal > New Terminal`).
3. Install dependencies:
   bash
   npm install
4. Start frontend and backend together:
   bash
   npm run dev

5. Open http://localhost:3000.

### Demo login
- Email: `admin@merchant.com`
- Password: `Password123!`

The Express API runs at http://localhost:3000

## Run tests
bash
npm test

Install Playwright's browser once:
bash
npx playwright install chromium

Run the end-to-end test:
bash
npm run test:e2e


## Useful commands
bash
npm run dev --workspace backend
npm run dev --workspace frontend
npm run build


## Project structure
text
merchant-loan-dashboard/
├── backend/
│   ├── src/
│   │   ├── middleware/auth.js
│   │   ├── data/applications.js
│   │   ├── app.js
│   │   └── server.js
│   └── tests/api.test.js
├── frontend/
│   ├── app/
│   │   ├── applications/[id]/page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   ├── lib/api.js
│   └── tests/dashboard.spec.js
└── package.json
```

## API endpoints
- `POST /api/auth/login`- returns a JWT
- `GET /api/applications?page=1&limit=8&search=&status=` - paginated applications
- `GET /api/applications/:id` - one application
- `GET /api/health` - health check

## Notes
This is a portfolio/demo implementation. It uses seeded in-memory data and a demo account.
For production, replace the demo authentication with a proper user store, use a database,
store secrets in environment variables, add refresh-token/session management, audit logging,
rate limiting, and role-based access control.
