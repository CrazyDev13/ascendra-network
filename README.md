# Ascendra Network

Affiliate portal website for [ascendranetwork.com](https://ascendranetwork.com) — the partner program for [iBets24](https://ibets24.com).

## Develop

```bash
cp .env.example .env
# Add your SendGrid API key and verified sender email

npm install
npm run dev
```

The Vite app runs on `http://localhost:5173` and proxies `/api` to the Express server on port `3001`.

### Contact / SendGrid

Affiliate contact submissions are posted to `POST /api/contact` and delivered through SendGrid to `CONTACT_TO_EMAIL`.

Required environment variables:

- `SENDGRID_API_KEY` — SendGrid API key
- `SENDGRID_FROM_EMAIL` — verified sender in SendGrid
- `SENDGRID_FROM_NAME` — display name for outbound mail
- `CONTACT_TO_EMAIL` — inbox that receives affiliate inquiries

## Build

```bash
npm run build
npm run preview
```

For production, run the API with `npm start` (after setting env vars) and serve the `dist` frontend from your host of choice.
