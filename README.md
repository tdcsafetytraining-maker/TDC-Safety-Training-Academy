# TDC HSE Training Academy

Mobile-first multilingual safety-training system for TDC Contracting. It includes English, Arabic, Urdu, and Hindi interfaces, eight detailed Working at Height slides, a five-question server-graded assessment, an 80% passing score, three attempts, a 24-hour lockout, Firebase accounts, Google Sheets records, and downloadable PDF certificates.

## GitHub Pages

Every push to `main` builds and deploys the static website through GitHub Actions.

Expected address: <https://tdcsafetytraining-maker.github.io/TDC-Safety-Training-Academy/>

## Firebase Authentication

1. Create or open the Firebase project.
2. In **Authentication → Sign-in method**, enable **Email/Password**.
3. In **Project settings → General**, add a Web App and copy its Web API key.
4. In **Authentication → Settings → Authorized domains**, add `tdcsafetytraining-maker.github.io`.
5. In the GitHub repository, open **Settings → Secrets and variables → Actions** and create `NEXT_PUBLIC_FIREBASE_API_KEY` with the Web API key.

Firebase stores passwords. Passwords are never sent to Google Sheets or Apps Script.

## Google Apps Script backend

1. Open the training-record spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with `apps-script/Code.gs` from this repository.
3. Open **Project Settings**, enable the manifest file, and replace it with `apps-script/appsscript.json`.
4. Under **Script Properties**, add:
   - `FIREBASE_API_KEY`: the same Firebase Web API key.
   - `SIGNATORY_NAME`: the name printed on certificates.
   - `SIGNATORY_TITLE`: the signatory job title.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to yourself and **Who has access** to Anyone.
7. Authorize the requested Sheets, Slides, Drive, and external-request permissions.
8. Copy the `/exec` deployment URL.
9. Add the GitHub Actions secret `NEXT_PUBLIC_TDC_BACKEND_URL` with that URL.
10. Run the GitHub Pages workflow again.

The backend validates every Firebase ID token, enforces attempts and lockouts, assigns the next yearly serial under a script lock, fills the Google Slides template, exports only PDF, writes the records, and returns a download link. A certificate displays `TDC/STA/001/YYYY`; its filesystem-safe filename is `TDC-STA-001-YYYY.pdf`.

## Google resources

- Spreadsheet ID: `1sA5iKlPIIdQHShS6q6NZ2dGyA3Dg6cDqg-cKZFgyUxU`
- Certificate folder ID: `1LUG-fYby0pfIZtDy1SEQwH2unbogP2lE`
- Slides template ID: `1p6GiXGadLPCFtxieBygKU5UKafUxnQGQIccpT1F-kaI`

The certificate folder is currently link-readable. Certificates contain learner names and course-completion details, so change its sharing policy if public access is not acceptable; doing so will require an authenticated download proxy.

## Local development

```bash
pnpm install
pnpm dev
```

For a production export:

```bash
pnpm build
```

