<template>
  <div class="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      
      <h2 class="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Welcome Back
      </h2>
      <p class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
        Silakan masuk ke akun admin Anda
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
        <div class="p-8">
          <div class="mb-6 rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <div class="flex">
              <div class="flex-shrink-0">
                <Info class="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="ml-3">
                <p class="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Demo Access: <span class="font-bold underline">admin</span> / <span class="font-bold underline">pastibisa</span>
                </p>
              </div>
            </div>
          </div>

          <form class="space-y-6" @submit.prevent="submit">
            <div>
              <label for="username" class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Username
              </label>
              <div class="mt-1.5 relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  <User class="h-4 w-4" />
                </div>
                <input
                  id="username"
                  v-model="username"
                  placeholder="Masukkan username"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
                  autocomplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Password
              </label>
              <div class="mt-1.5 relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  <KeyRound class="h-4 w-4" />
                </div>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-blue-600"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>

            <transition name="shake">
              <div v-if="error" class="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                <AlertCircle class="h-5 w-5 flex-shrink-0" />
                {{ error }}
              </div>
            </transition>

            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] dark:shadow-none"
            >
              Masuk Sekarang
              <ArrowRight class="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      
      <p class="mt-8 text-center text-xs text-gray-500">
        &copy; 2026 Admin Panel Employee. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { 
  User, 
  KeyRound, 
  AlertCircle, 
  ArrowRight, 
  Info 
} from 'lucide-vue-next'

const router = useRouter()
const { doLogin } = useAuth()

const username = ref('admin')
const password = ref('pastibisa')
const error = ref('')

async function submit() {
  error.value = ''
  const res = await doLogin({ username: username.value, password: password.value })
  if (!res.ok) { error.value = res.message; return }
  router.push('/employees')
}
</script>

<style scoped>
.shake-enter-active {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>