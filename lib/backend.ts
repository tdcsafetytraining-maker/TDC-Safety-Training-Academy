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

function callBackendViaFrame<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  if (!backendUrl || typeof document === 'undefined') throw new Error('The training records service is unavailable.');
  return new Promise<T>((resolve, reject) => {
    const channel = `tdc-${crypto.randomUUID()}`;
    const frameName = `tdc-records-${crypto.randomUUID()}`;
    const frame = document.createElement('iframe');
    frame.name = frameName;
    frame.hidden = true;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = backendUrl;
    form.target = frameName;
    form.hidden = true;

    const fields = { bridge: '1', channel, payload: JSON.stringify({ action, ...payload }) };
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    const cleanup = () => { window.removeEventListener('message', onMessage); frame.remove(); form.remove(); };
    const timer = window.setTimeout(() => { cleanup(); reject(new Error('The training records service did not respond. Please try again.')); }, 30000);
    const onMessage = (event: MessageEvent) => {
      const allowedOrigin = event.origin === 'https://script.google.com' || event.origin.endsWith('.googleusercontent.com');
      if (!allowedOrigin || event.source !== frame.contentWindow || event.data?.channel !== channel) return;
      window.clearTimeout(timer);
      cleanup();
      const result = event.data.payload as BackendResponse<T>;
      if (!result?.ok || !result.data) reject(new Error(result?.error ?? 'The training service rejected the request.'));
      else resolve(result.data);
    };
    window.addEventListener('message', onMessage);
    document.body.append(frame, form);
    form.submit();
  });
}

export async function callBackend<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  if (!backendUrl) throw new Error('Training records are not configured. Add NEXT_PUBLIC_TDC_BACKEND_URL.');
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...payload }),
    });
    const result = (await response.json()) as BackendResponse<T>;
    if (!result.ok || !result.data) throw new Error(result.error ?? 'The training service rejected the request.');
    return result.data;
  } catch (problem) {
    if (problem instanceof Error && !/fetch|network|load failed/i.test(problem.message)) throw problem;
    return callBackendViaFrame<T>(action, payload);
  }
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
  return callBackend<{ fullName: string; email: string; certificates: CertificateRecord[]; completedCourseIds: string[] }>('getProfile', { idToken });
}

