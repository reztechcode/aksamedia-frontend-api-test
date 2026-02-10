<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Account Settings</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Kelola informasi profil dan identitas akun Anda.</p>
      </div>
      <div class="hidden sm:block">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <UserCog class="h-6 w-6" />
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div class="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
      
      <div class="px-6 pb-8 md:px-8">
        <div class="relative -mt-12 mb-6">
          <div class="inline-flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gray-100 text-gray-400 shadow-sm dark:border-gray-900 dark:bg-gray-800">
            <User2 class="h-12 w-12" />
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="save">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nama Lengkap</label>
              <div class="relative mt-1.5">
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <BadgeCheck class="h-4 w-4" />
                </div>
                <input
                  v-model="name"
                  placeholder="Masukkan nama lengkap"
                  class="block w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
                  required
                />
              </div>
            </div>

            <div class="md:col-span-2">
              <div class="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm dark:bg-gray-900">
                  <Fingerprint class="h-5 w-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Username</div>
                  <div class="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">@{{ user?.username }}</div>
                </div>
              </div>
            </div>
          </div>

          <Transition name="slide-up">
            <div v-if="success" class="flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400">
              <CheckCircle2 class="h-5 w-5 flex-shrink-0" />
              {{ success }}
            </div>
          </Transition>

          <div class="flex pt-2">
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] dark:shadow-none sm:w-auto"
            >
              <Save class="h-4 w-4" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="rounded-2xl border border-dashed border-gray-200 p-6 dark:border-gray-800">
      <div class="flex gap-4">
        <div class="text-blue-500">
          <ShieldCheck class="h-5 w-5" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white">Security Tip</h4>
          <p class="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Perubahan nama akan langsung terlihat di seluruh dashboard dan navigasi. Gunakan nama asli untuk memudahkan administrasi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useAuth } from '../composables/useAuth'
import { updateUserName } from '../services/auth.local'
import { 
  UserCog, 
  User2, 
  BadgeCheck, 
  Fingerprint, 
  CheckCircle2, 
  Save, 
  ShieldCheck 
} from 'lucide-vue-next'

const { user, refreshUser } = useAuth()
const name = ref('')
const success = ref('')

watchEffect(() => {
  name.value = user.value?.name || ''
})

function save() {
  success.value = ''
  updateUserName(name.value)
  refreshUser()
  success.value = 'Nama berhasil diperbarui.'
  
  setTimeout(() => {
    success.value = ''
  }, 3000)
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>