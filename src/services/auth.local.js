import { LS } from '../storage/keys'
import { readJSON, writeJSON, remove } from '../storage/localdb'

const STATIC = { username: 'admin', password: 'pastibisa', name: 'Admin' }

export function getSession() {
  return readJSON(LS.SESSION, null)
}

export function getUser() {
  return readJSON(LS.USER, null)
}

export function login({ username, password }) {
  if (username !== STATIC.username || password !== STATIC.password) {
    return { ok: false, message: 'Username atau password salah.' }
  }

  const existing = getUser()
  const user = existing ?? { id: 'local-admin', name: STATIC.name, username: STATIC.username }
  writeJSON(LS.USER, user)
  writeJSON(LS.SESSION, { token: 'local-token', loggedInAt: Date.now() })

  return { ok: true, message: 'Login berhasil.', user }
}

export function logout() {
  remove(LS.SESSION)
  return { ok: true }
}

export function updateUserName(name) {
  const user = getUser()
  if (!user) return null
  const next = { ...user, name }
  writeJSON(LS.USER, next)
  return next
}
