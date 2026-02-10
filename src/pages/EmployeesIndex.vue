<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Employees</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total {{ pagination.total }} karyawan terdaftar dalam sistem.</p>
      </div>

      <RouterLink
        to="/employees/create"
        class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 dark:shadow-none"
      >
        <Plus class="mr-2 h-4 w-4" />
        Add Employee
      </RouterLink>
    </div>

    <div class="grid gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Search</label>
        <div class="relative mt-1.5">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search class="h-4 w-4" />
          </span>
          <input
            v-model="search"
            placeholder="Cari nama karyawan..."
            class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Division</label>
        <div class="relative mt-1.5">
          <select
            v-model="division_id"
            class="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
          >
            <option value="">All Divisions</option>
            <option v-for="d in divisions" :key="d.id" :value="d.id">{{ d.name }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <ChevronDown class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div v-if="employees.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
          <Inbox class="h-8 w-8 text-gray-300" />
        </div>
        <p class="mt-4 text-sm font-medium text-gray-500">Tidak ada data karyawan ditemukan.</p>
      </div>

      <div v-else class="hidden md:block">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            <tr>
              <th class="px-6 py-4">Employee</th>
              <th class="px-6 py-4">Phone</th>
              <th class="px-6 py-4">Position</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="e in employees" :key="e.id" class="group transition-colors hover:bg-blue-50/30 dark:hover:bg-blue-900/5">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <img v-if="e.image" :src="e.image" class="h-10 w-10 rounded-xl object-cover ring-2 ring-gray-100 transition-all group-hover:ring-blue-100 dark:ring-gray-800" />
                  <div v-else class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {{ initials(e.name) }}
                  </div>
                  <div>
                    <div class="font-bold text-gray-900 dark:text-white">{{ e.name }}</div>
                    <div class="text-[10px] font-mono text-gray-400 tracking-tight">{{ e.id.slice(0, 8) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 font-medium text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <Phone class="h-3 w-3 text-gray-400" />
                  {{ e.phone }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900 dark:text-white">{{ e.position }}</div>
                <div class="mt-1 flex">
                  <span class="rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                    {{ e.division?.name }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1">
                  <RouterLink :to="`/employees/${e.id}/edit`" class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                    <PencilLine class="h-4 w-4" />
                  </RouterLink>
                  <button @click="confirmDelete(e)" class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="divide-y divide-gray-100 dark:divide-gray-800 md:hidden">
        <div v-for="e in employees" :key="e.id" class="p-5">
          <div class="flex items-center gap-4">
            <img v-if="e.image" :src="e.image" class="h-12 w-12 rounded-2xl object-cover shadow-sm" />
            <div v-else class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/30">
              {{ initials(e.name) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-gray-900 dark:text-white truncate">{{ e.name }}</div>
              <div class="text-xs text-gray-500 font-medium">{{ e.position }} • {{ e.division?.name }}</div>
            </div>
            <div class="flex gap-2">
               <RouterLink :to="`/employees/${e.id}/edit`" class="rounded-xl border border-gray-100 p-2.5 text-gray-600 dark:border-gray-800 dark:text-gray-400">
                <PencilLine class="h-4 w-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between px-2">
      <p class="text-xs text-gray-500 font-medium">
        Showing <span class="text-gray-900 dark:text-white">{{ employees.length }}</span> of {{ pagination.total }} results
      </p>
      <div class="inline-flex rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Pagination :pagination="pagination" @change="(p) => (page = p)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Pagination from '../components/Pagination.vue'
import { useQueryState } from '../composables/useQueryState'
import { listDivisions } from '../services/divisions.local'
import { deleteEmployee, listEmployees } from '../services/employees.local'

// IMPORT LUCIDE ICONS
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Inbox, 
  PencilLine, 
  Trash2, 
  Phone 
} from 'lucide-vue-next'

const { page, search, division_id } = useQueryState()
const divisions = ref([])
const employees = ref([])
const pagination = ref({ current_page: 1, per_page: 5, total: 0, last_page: 1 })

function initials(name) {
  return (name || '')
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')
}

async function load() {
  const res = await listEmployees({ name: search.value, division_id: division_id.value, page: page.value })
  employees.value = res.data.employees
  pagination.value = res.pagination
  if (page.value !== res.pagination.current_page) page.value = res.pagination.current_page
}



onMounted(async () => {
  const divRes = await listDivisions()
  divisions.value = divRes.data.divisions
  await load()
})

function confirmDelete(emp) {
  const ok = confirm(`Hapus employee "${emp.name}"?`)
  if (!ok) return
  deleteEmployee(emp.id)
  load()
}

watch([page, search, division_id], async () => {
  await load()
})
</script>