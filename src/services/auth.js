import { LS } from '../storage/keys'
import { readJSON, writeJSON, remove } from '../storage/localdb'
import { apiFetch, setToken, clearToken } from './apiClient'

export function getSession() {
  const token = readJSON(LS.API_TOKEN, null)
  return token ? { token } : null
}

export function getUser() {
  return readJSON(LS.USER, null)
}

export async function login({ username, password }) {
  const res = await apiFetch('/login', { method: 'POST', body: { username, password } })
  const token = res?.data?.token
  const admin = res?.data?.admin
  if (!token || !admin) return { ok: false, message: 'Response login tidak valid.' }

  setToken(token)
  writeJSON(LS.USER, admin)
  writeJSON(LS.SESSION, { loggedInAt: Date.now() }) // optional

  return { ok: true, message: res.message || 'Login berhasil.', user: admin }
}

export async function logout() {
  try {
    await apiFetch('/logout', { method: 'POST' })
  } finally {
    clearToken()
    remove(LS.USER)
    remove(LS.SESSION)
  }
  return { ok: true }
}

// Backend tidak diminta ada endpoint update admin,
// jadi untuk sekarang tetap lokal (untuk navbar), atau kamu bisa matikan fitur ini.
export function updateUserName(name) {
  const user = getUser()
  if (!user) return null
  const next = { ...user, name }
  writeJSON(LS.USER, next)
  return next
}
