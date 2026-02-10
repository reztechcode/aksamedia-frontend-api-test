import { LS } from '../storage/keys'
import { readJSON, writeJSON, remove } from '../storage/localdb'

const BASE = import.meta.env.VITE_API_BASE_URL || ''

export function getToken() {
  return readJSON(LS.API_TOKEN, null)
}
export function setToken(token) {
  writeJSON(LS.API_TOKEN, token)
}
export function clearToken() {
  remove(LS.API_TOKEN)
}

function buildQuery(params = {}) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    sp.set(k, String(v))
  }
  const qs = sp.toString()
  return qs ? `?${qs}` : ''
}

export async function apiFetch(path, { method = 'GET', params, body, isForm = false } = {}) {
  const url = `${BASE}${path}${buildQuery(params)}`
  const token = getToken()

  const headers = { Accept: 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  if (!isForm) headers['Content-Type'] = 'application/json'

  const res = await fetch(url, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })

  const ct = res.headers.get('content-type') || ''
  const payload = ct.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const msg = payload?.message || `HTTP ${res.status}`
    const err = new Error(msg)
    err.status = res.status
    err.payload = payload
    throw err
  }
  return payload
}
