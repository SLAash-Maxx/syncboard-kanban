const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Small fetch wrapper shared by authApi.js and taskApi.js.
 * - Prefixes every path with the API base URL
 * - Attaches the JWT (if present) as a Bearer token
 * - Throws on non-2xx responses with the server's `error` message so
 *   callers can just try/catch instead of checking res.ok everywhere
 */
async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // 204 No Content has no body to parse
  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.error || `Request failed (${res.status})`);
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export default request;
