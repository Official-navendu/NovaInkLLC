# Square Sandbox Payment Integration - Nova Ink LLC

This document details the configuration, security architecture, and deployment guide for the Square Sandbox credit card payment integration built into the Nova Ink LLC e-commerce website.

---

## 1. Overview & Architecture

The payment system follows a secure 2-tier architecture:

```
[Customer Browser] 
  │  1. Card details entered securely in iframe
  ▼
[Square Web Payments SDK (CDN)]
  │  2. Tokenizes card -> returns single-use token `cnon:card-nonce-ok`
  ▼
[Vercel Serverless API (/api/payments/create)]
  │  3. Verifies cart item prices against server catalog (`src/data/products.js`)
  │  4. Calculates USD total in integer cents
  │  5. Generates cryptographic idempotency key
  │  6. Sends POST request with `SQUARE_ACCESS_TOKEN`
  ▼
[Square Sandbox Payments API]
  │  7. Processes payment & returns transaction result
  ▼
[Customer Order Confirmed & Cart Cleared]
```

### Security Principles:
- **Zero Token Leakage**: The secret `SQUARE_ACCESS_TOKEN` is strictly consumed on the backend serverless function (`api/payments/create.js`). It is **NEVER** exposed to client-side JS, Vite `VITE_*` variables, or Git repositories.
- **Server-Side Price Recalculation**: Client-submitted cart totals or prices are never trusted. Product prices are looked up directly from `src/data/products.js` on the server before calling Square.
- **Idempotency**: Every charge request includes a unique UUID (`sq_idempotency_*`) to prevent double-charging on network retries or fast double-clicks.

---

## 2. Environment Variables

### Local Development (`.env`):
Create or verify your local `.env` file in the project root:

```env
# Square Sandbox Client ID (Safe for frontend)
VITE_SQUARE_APPLICATION_ID=sandbox-sq0idb-Sz57pqhWKUJrmMYAGaJ6Pw

# Square Sandbox Secret Access Token (Server-only - NEVER prefix with VITE_)
SQUARE_ACCESS_TOKEN=EAAAl6E5gzGNw85l_qTe89tpI9tQWz9bSj4UmVm71KDin6TH2MYiyQXFFGz458PE
```

> ⚠️ **Important**: `.env` is listed in `.gitignore` and must never be committed to Git.

---

## 3. Vercel Deployment Configuration

When deploying to Vercel, add the environment variables in your Vercel Project Settings:

1. Go to **Vercel Dashboard** → Select Project **Nova Ink LLC**.
2. Go to **Settings** → **Environment Variables**.
3. Add:
   - Name: `VITE_SQUARE_APPLICATION_ID`  
     Value: `sandbox-sq0idb-Sz57pqhWKUJrmMYAGaJ6Pw` (Target: Production, Preview, Development)
   - Name: `SQUARE_ACCESS_TOKEN`  
     Value: `EAAAl6E5gzGNw85l_qTe89tpI9tQWz9bSj4UmVm71KDin6TH2MYiyQXFFGz458PE` (Target: Production, Preview, Development)

---

## 4. Testing Square Sandbox Payments

When testing checkout on `http://localhost:5173` or Vercel Preview builds, use official Square Sandbox test card details:

| Field | Test Card Value |
| --- | --- |
| **Card Number** | `4111 1111 1111 1111` (Approved Visa) |
| **Expiration** | Any future date (e.g. `12/28`) |
| **CVV** | `123` |
| **Postal Code** | Any 5-digit ZIP (e.g. `90210`) |

### Test Failure Cases:
- **Declined Card**: Use `4000 0000 0000 0002` (Simulates DECLINED card).
- **Verification Failed**: Use `4000 0000 0000 0005`.

---

## 5. Moving to Production (Future Ready)

To transition from Sandbox to Live Production payments:

1. Obtain production credentials from your **Square Developer Dashboard** (Production App ID & Production Access Token).
2. Update Vercel Environment Variables:
   - Set `VITE_SQUARE_APPLICATION_ID` to `sq0idp-...`
   - Set `SQUARE_ACCESS_TOKEN` to `EAAA...`
3. Update `index.html` and `src/utils/squareSdk.js` script URL from `https://sandbox.web.squarecdn.com/v1/square.js` to `https://web.squarecdn.com/v1/square.js`.
4. In `api/payments/create.js`, update the Square API host from `https://connect.squareupsandbox.com` to `https://connect.squareup.com`.
