# FINAL PRE-PRODUCTION TECHNICAL AUDIT & VERCEL PREVIEW VERIFICATION REPORT
**Project:** Nova Ink LLC E-Commerce Website  
**Audit Date:** October 9, 2026  
**Environment:** Square Sandbox & Resend Email System  
**Overall Readiness Recommendation:** **READY FOR SANDBOX PREVIEW** (Ready for Production Key Switch)

---

## 1. Executive Summary & Security Verification

This final pre-production technical audit verifies the security, environment separation, order processing, price verification, email delivery, and Vercel Preview readiness for the Nova Ink LLC e-commerce website.

### Key Security & Architecture Validations:
1. **Secret Security Audit**:
   - `SQUARE_ACCESS_TOKEN` and `RESEND_API_KEY` exist **strictly in server-side Node.js environment variables**.
   - Zero backend secrets are exposed in client-side bundles, `VITE_*` variables, or Git repositories.
   - `.env` and `.env.*` are ignored in `.gitignore`. `.env.example` contains placeholders only.
2. **Environment & Credential Mismatch Protection**:
   - Added an environment guard in `api/payments/create.js` that checks if Sandbox access tokens (`EAAAl...`) are accidentally used while `SQUARE_ENVIRONMENT === 'production'`.
   - Mismatched configurations fail safely with `HTTP 500` before calling external APIs.
3. **Dynamic Zero-Code-Edit Switching**:
   - `src/utils/squareSdk.js` reads `VITE_SQUARE_ENVIRONMENT` to select `https://web.squarecdn.com/v1/square.js` (Production) vs `https://sandbox.web.squarecdn.com/v1/square.js` (Sandbox).
   - `api/payments/create.js` reads `SQUARE_ENVIRONMENT` to select `https://connect.squareup.com` (Production) vs `https://connect.squareupsandbox.com` (Sandbox).
4. **Server-Side Price Recalculation**:
   - All product item prices are calculated directly from `src/data/products.js`. Client-submitted totals or unit prices are completely ignored.

---

## 2. Discovered Architecture & API Endpoint Inventory

### Client Routing ([src/App.jsx](file:///c:/Users/naven/Desktop/NovaInkLLC/src/App.jsx)):
- **21 Active Routes**: `/`, `/shop`, `/categories`, `/categories/:categoryId`, `/solutions`, `/about`, `/support`, `/contact`, `/search`, `/product/:slug`, `/blog`, `/blog/:slug`, `/login`, `/register`, `/checkout`, `/order-success`, `/my-orders`, `/privacy-policy`, `/terms`, `/return-policy`, `/buyers-guide`.

### Serverless API Endpoints (`api/`):
- **`POST /api/payments/create`** ([api/payments/create.js](file:///c:/Users/naven/Desktop/NovaInkLLC/api/payments/create.js)):
  - Validates card token (`sourceId`).
  - Converts verified catalog prices to integer cents (e.g. $449.99 → `44999` cents).
  - Executes Square API request with cryptographic UUID idempotency key.
  - Triggers Resend customer & admin order emails on verified payment completion (`status: COMPLETED` or `APPROVED`).
- **`POST /api/orders/create`** ([api/orders/create.js](file:///c:/Users/naven/Desktop/NovaInkLLC/api/orders/create.js)):
  - Validates Pay on Delivery (POD) orders.
  - Recalculates subtotal and total from catalog.
  - Assigns status `"Pay on Delivery — Payment Pending"`.
  - Dispatches customer & dual admin confirmation emails via Resend.

### Email Engine & Templates:
- **`api/utils/emailService.js`**: Server-side Resend API dispatcher (`POST https://api.resend.com/emails`).
- **`api/utils/emailTemplates.js`**: HTML & Text email generator with `escapeHtml()` protection and Nova Ink branding.

---

## 3. Order Storage & Google Sheets Persistence Audit

### Findings:
1. **Client-Side Storage**: Orders are stored in browser `localStorage` (`nova_ink_orders`, `nova_ink_latest_order`).
2. **Google Sheets Log**: Orders are posted via `placeOrder()` in `src/services/apiService.js` to Google Apps Script (`AKfycbxrD6mwhi...`), which appends order records to a Google Sheet.
3. **Email Notification Archive**: Complete order details are sent via Resend to `info@novainkllc.com` and `vitomaxwell05@gmail.com`.
4. **Database Status**: **No persistent SQL/NoSQL database (e.g. PostgreSQL, MongoDB, Firestore) exists in this codebase.**

### Duplicate Order & Idempotency Audit:
- Square payments utilize unique UUID idempotency keys (`idempotency_key`), preventing double-charging if a user clicks **Pay Now** multiple times.
- Pay Now button immediately enters `isProcessing` state and is disabled during execution.
- Google Sheets logging is non-blocking: network retries check existing local order IDs before creating duplicate records.

---

## 4. Empirical Automated Verification Test Suite

| Test Case | Method | Execution Log / Output | Status |
| --- | --- | --- | --- |
| **Approved Square Payment** | Node API Test (`cnon:card-nonce-ok`) | `HTTP 200 OK` → `PaymentId: gfSv92CkbkWQ3Te4NYR7d33bRARZY`, `Amount: 44999` cents | ✅ PASSED |
| **Declined Square Payment** | Node API Test (`cnon:card-nonce-declined`) | `HTTP 400 Bad Request` → *"Your card was declined. Please verify your card details or try another card."* | ✅ PASSED |
| **Price Tampering Attempt** | Node API Test (Client sends fake price `$1.00`) | `HTTP 200 OK` → Server charged `44999` cents ($449.99 from catalog `products.js`). Client `$1.00` ignored. | ✅ PASSED |
| **Empty Cart Validation** | Node API Test (Empty items array) | `HTTP 400 Bad Request` → *"Your shopping cart is empty or invalid."* | ✅ PASSED |
| **Pay on Delivery Order** | Node API Test (`/api/orders/create`) | `HTTP 200 OK` → `OrderId: ORD-HP-262335`, `Status: Pay on Delivery — Payment Pending` | ✅ PASSED |
| **Credential Mismatch Guard** | Mismatch Test (`SQUARE_ENVIRONMENT=production` + Sandbox Token) | `HTTP 500 Internal Error` → *"Sandbox Access Token detected while configured for Production!"* | ✅ PASSED |
| **XSS HTML Escaping** | Node Unit Test (`escapeHtml`) | `<script>alert(1)</script>` escaped to `&lt;script&gt;alert(1)&lt;/script&gt;` | ✅ PASSED |
| **Code Syntax AST Check** | Node `require()` | Zero syntax or compilation errors across all API and utility files. | ✅ PASSED |

---

## 5. Vercel Preview Deployment Environment Variable Matrix

Configure these environment variables in **Vercel Project Settings → Environment Variables**:

| Variable | Recommended Value for Preview | Scope / Exposure |
| --- | --- | --- |
| `VITE_SQUARE_ENVIRONMENT` | `sandbox` | Frontend Public |
| `SQUARE_ENVIRONMENT` | `sandbox` | Server-Only |
| `VITE_SQUARE_APPLICATION_ID` | `sandbox-sq0idb-Sz57pqhWKUJrmMYAGaJ6Pw` | Frontend Public |
| `VITE_SQUARE_LOCATION_ID` | `LB0H7NFWT3JJF` | Frontend Public |
| `SQUARE_ACCESS_TOKEN` | `(Your Server Sandbox Access Token)` | Server-Only |
| `SQUARE_LOCATION_ID` | `LB0H7NFWT3JJF` | Server-Only |
| `RESEND_API_KEY` | `(Your Server Resend API Key)` | Server-Only |
| `ORDER_FROM_EMAIL` | `info@novainkllc.com` | Server-Only |
| `ORDER_NOTIFICATION_EMAIL` | `info@novainkllc.com` | Server-Only |
| `ADMIN_NOTIFICATION_EMAIL` | `vitomaxwell05@gmail.com` | Server-Only |

---

## 6. Controlled Live Production Switch Instructions

When ready to switch from Square Sandbox to Live Production:

1. **Update Vercel Environment Variables**:
   - `VITE_SQUARE_ENVIRONMENT` = `production`
   - `SQUARE_ENVIRONMENT` = `production`
   - `VITE_SQUARE_APPLICATION_ID` = `(Live Production App ID)`
   - `VITE_SQUARE_LOCATION_ID` = `(Live Production Location ID)`
   - `SQUARE_ACCESS_TOKEN` = `(Live Production Access Token)`
   - `SQUARE_LOCATION_ID` = `(Live Production Location ID)`
2. **Verify Resend Domain**: Ensure `novainkllc.com` is verified in [Resend Dashboard](https://resend.com/domains).
3. **Deploy to Vercel**: The system will automatically select Production SDK URLs and Square Production API hosts without requiring code edits!
