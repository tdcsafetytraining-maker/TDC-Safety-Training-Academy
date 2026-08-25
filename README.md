# TDC HSE Training Academy

Mobile-first multilingual safety-training prototype for TDC Contracting. It includes English, Arabic, Urdu, and Hindi interfaces, four learning cards, a five-question assessment, an 80% passing score, three attempts, and a 24-hour lockout message.

## GitHub Pages

Every push to `main` builds and deploys the static website through GitHub Actions.

Expected address: <https://tdcsafetytraining-maker.github.io/TDC-Safety-Training-Academy/>

## Important production note

This repository currently contains the public training-interface prototype. Secure user accounts, password recovery, server-enforced attempt limits, Google Sheets recording, certificate PDF generation, and certificate email delivery require a separate backend service and are not provided securely by GitHub Pages alone.

## Local development

```bash
pnpm install
pnpm dev
```

For a production export:

```bash
pnpm build
```
