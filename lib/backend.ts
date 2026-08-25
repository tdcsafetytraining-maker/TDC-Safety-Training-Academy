export type CertificateRecord = {
  certificateId: string;
  courseTitle: string;
  completionDate: string;
  scorePercent: number;
  fileName: string;
  downloadUrl: string;
};

type BackendResponse<T> = { ok: boolean; error?: string; data?: T };

const backendUrl = process.env.NEXT_PUBLIC_TDC_BACKEND_URL;

export async function callBackend<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  if (!backendUrl) throw new Error('Training records are not configured. Add NEXT_PUBLIC_TDC_BACKEND_URL.');
  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload }),
  });
  const result = (await response.json()) as BackendResponse<T>;
  if (!result.ok || !result.data) throw new Error(result.error ?? 'The training service rejected the request.');
  return result.data;
}

export function registerLearner(idToken: string, fullName: string, language: string) {
  return callBackend<{ learnerId: string }>('registerLearner', { idToken, fullName, language });
}

export function submitAttempt(payload: Record<string, unknown>) {
  return callBackend<{
    passed: boolean;
    attemptNumber: number;
    lockoutUntil?: string;
    certificate?: CertificateRecord;
  }>('submitAttempt', payload);
}

export function getProfile(idToken: string) {
  return callBackend<{ fullName: string; email: string; certificates: CertificateRecord[] }>('getProfile', { idToken });
}
