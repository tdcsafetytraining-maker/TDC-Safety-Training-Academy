export type FirebaseSession = {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  email: string;
  displayName?: string;
};

type FirebaseRefreshResponse = {
  id_token: string;
  refresh_token: string;
  expires_in: string;
  user_id: string;
};

type FirebaseError = { error?: { message?: string } };

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

function endpoint(action: string) {
  if (!apiKey) throw new Error('Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY.');
  return `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${apiKey}`;
}

async function request(action: string, body: Record<string, unknown>) {
  const response = await fetch(endpoint(action), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as FirebaseSession & FirebaseError;
  if (!response.ok) {
    const code = data.error?.message ?? 'AUTHENTICATION_FAILED';
    throw new Error(code.replaceAll('_', ' ').toLowerCase());
  }
  return data;
}

export async function signUp(email: string, password: string, displayName: string) {
  const session = await request('signUp', { email, password, returnSecureToken: true });
  return request('update', { idToken: session.idToken, displayName, returnSecureToken: true });
}

export function signIn(email: string, password: string) {
  return request('signInWithPassword', { email, password, returnSecureToken: true });
}

export async function refreshSession(refreshToken: string): Promise<FirebaseSession> {
  if (!apiKey) throw new Error('Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY.');
  const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  });
  const data = (await response.json()) as FirebaseRefreshResponse & FirebaseError;
  if (!response.ok) {
    const code = data.error?.message ?? 'SESSION_EXPIRED';
    throw new Error(code.replaceAll('_', ' ').toLowerCase());
  }
  return {
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    localId: data.user_id,
    email: '',
  };
}

export function changePassword(idToken: string, password: string) {
  return request('update', { idToken, password, returnSecureToken: true });
}

export function sendPasswordReset(email: string) {
  return request('sendOobCode', { requestType: 'PASSWORD_RESET', email });
}
