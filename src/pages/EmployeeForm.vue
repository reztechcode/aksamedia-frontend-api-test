<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div class="flex items-center gap-4">
      <button 
        @click="goBack" 
        class="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-200 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900"
      >
        <ArrowLeft class="h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600" />
      </button>
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ isEdit ? 'Edit Employee Details' : 'Create New Employee' }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Pastikan informasi karyawan sudah sesuai.</p>
      </div>
    </div>

    <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <form class="p-6 md:p-8" @submit.prevent="submit">
        
        <div class="mb-8 flex flex-col items-center gap-6 sm:flex-row">
          <div class="relative group">
            <div class="h-24 w-24 overflow-hidden rounded-3xl bg-blue-50 ring-4 ring-white shadow-md dark:bg-gray-800 dark:ring-gray-950">
              <img v-if="form.image" :src="form.image" class="h-full w-full object-cover" alt="Preview" />
              <div v-else class="flex h-full w-full items-center justify-center text-blue-300">
                <UserCircle2 class="h-12 w-12" />
              </div>
            </div>
          </div>
          
          <div class="flex-1 text-center sm:text-left">
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-200">Profile Picture</label>
            <p class="mb-3 text-xs text-gray-500">Format: JPG, PNG. Max 2MB (Base64)</p>
            <label class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
              <Camera class="h-4 w-4" />
              <span>Change Photo</span>
              <input type="file" accept="image/*" class="hidden" @change="onFile" />
            </label>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Full Name</label>
            <input
              v-model="form.name"
              placeholder="e.g. John Doe"
              class="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Phone Number</label>
            <input
              v-model="form.phone"
              placeholder="0812..."
              class="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Division</label>
            <div class="relative">
              <select
                v-model="form.division_id"
                class="mt-1.5 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
                required
              >
                <option value="" disabled>Select Division</option>
                <option v-for="d in divisions" :key="d.id" :value="d.id">{{ d.name }}</option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Position</label>
            <input
              v-model="form.position"
              placeholder="e.g. Senior Backend Developer"
              class="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
              required
            />
          </div>
        </div>

        <TransitionGroup name="fade">
          <div v-if="error" key="error" class="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle class="h-5 w-5" />
            {{ error }}
          </div>
          <div v-if="success" key="success" class="mt-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">
            <CheckCircle2 class="h-5 w-5" />
            {{ success }}
          </div>
        </TransitionGroup>

        <div class="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-8 dark:border-gray-800 sm:flex-row-reverse">
          <button
            type="submit"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 dark:shadow-none"
          >
            <Save class="h-4 w-4" />
            {{ isEdit ? 'Update Employee' : 'Create Employee' }}
          </button>
          
          <button
            type="button"
            @click="goBack"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 active:scale-95 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X class="h-4 w-4" />
            Discard
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listDivisions } from '../services/divisions.local'
import { createEmployee, getEmployee, updateEmployee } from '../services/employees.local'
import { 
  ArrowLeft, 
  UserCircle2, 
  Camera, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  Save, 
  X 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const divisions = ref([])
const error = ref('')
const success = ref('')

const form = reactive({
  imageFile: null,
  imagePreview: '',
  name: '',
  phone: '',
  division_id: '',
  position: '',
})

function fillFromEmployee(emp) {
  form.image = emp.image || ''
  form.name = emp.name || ''
  form.phone = emp.phone || ''
  form.division_id = emp.division?.id || ''
  form.position = emp.position || ''
}

onMounted(async () => {
  const divRes = await listDivisions()
  divisions.value = divRes.data.divisions

  if (isEdit.value) {
    const res = await getEmployee(route.params.id) // butuh endpoint show
    const emp = res.data.employee || res.data // tergantung format backend kamu
    form.imagePreview = emp.image || ''
    form.name = emp.name
    form.phone = emp.phone
    form.division_id = emp.division?.id || emp.division_id
    form.position = emp.position
  }
})

function onFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  form.imageFile = file
  form.imagePreview = URL.createObjectURL(file)
}

function validate() {
  if (!form.name.trim()) return 'Nama wajib diisi.'
  if (!form.phone.trim()) return 'Phone wajib diisi.'
  if (!form.division_id) return 'Division wajib dipilih.'
  if (!form.position.trim()) return 'Position wajib diisi.'
  return ''
}

async function submit() {
  error.value = ''
  success.value = ''

  const msg = validate()
  if (msg) {
    error.value = msg
    return
  }

  const division = divisions.value.find((d) => d.id === form.division_id)
  if (!division) {
    error.value = 'Division tidak valid.'
    return
  }
  
  const payload = {
    image: form.imageFile || null,     // File atau null
    name: form.name.trim(),
    phone: form.phone.trim(),
    division_id: division.id,          // UUID
    position: form.position.trim(),
  }

  try {
    const res = isEdit.value
      ? await updateEmployee(route.params.id, payload)
      : await createEmployee(payload)

    // kalau backend balikin status di body
    if (res?.status === 'error') {
      error.value = res.message || 'Terjadi kesalahan.'
      return
    }

    success.value = res?.message || (isEdit.value ? 'Berhasil memperbarui karyawan.' : 'Berhasil menambahkan karyawan.')
    setTimeout(() => router.push('/employees'), 400)
  } catch (e) {
    // kalau apiFetch throw (HTTP 4xx/5xx)
    error.value = e?.payload?.message || e?.message || 'Terjadi kesalahan.'
  }
}


function goBack() {
  router.push('/employees')
}
</script>
