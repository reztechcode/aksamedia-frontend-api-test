import { apiFetch } from './apiClient'

export async function listDivisions({ name = '', page = 1 } = {}) {
  return await apiFetch('/divisions', { method: 'GET', params: { name, page } })
}

export function ensureDivisions() {
  return []
}
