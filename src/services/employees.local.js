import { apiFetch } from './apiClient'

export async function listEmployees({ name = '', division_id = '', page = 1, per_page } = {}) {
  return await apiFetch('/employees', { method: 'GET', params: { name, division_id, page, per_page } })
}

// create (multipart)
export async function createEmployee(payload) {
  const fd = new FormData()
  if (payload.image instanceof File) fd.append('image', payload.image)
  fd.append('name', payload.name)
  fd.append('phone', payload.phone)
  fd.append('division', payload.division_id) // sesuai soal backend
  fd.append('position', payload.position)

  return await apiFetch('/employees', { method: 'POST', body: fd, isForm: true })
}

// update (multipart)
export async function updateEmployee(id, payload) {
  const fd = new FormData()
  if (payload.image instanceof File) fd.append('image', payload.image)
  fd.append('name', payload.name)
  fd.append('phone', payload.phone)
  fd.append('division', payload.division_id)
  fd.append('position', payload.position)

  // Laravel sering butuh override method
  fd.append('_method', 'PUT')

  return await apiFetch(`/employees/${id}`, { method: 'POST', body: fd, isForm: true })
}

export async function deleteEmployee(id) {
  return await apiFetch(`/employees/${id}`, { method: 'DELETE' })
}

export async function getEmployee(id) {
  return await apiFetch(`/employees/${id}`, { method: 'GET' })
}
