<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-gray-900">
          Aksamedia FE
        </div>

        <nav class="hidden items-center gap-2 md:flex">
          <RouterLink
            to="/employees"
            class="rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="route.path.startsWith('/employees') ? 'font-semibold' : ''"
          >Employees</RouterLink>

          <RouterLink
            to="/profile"
            class="rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="route.path === '/profile' ? 'font-semibold' : ''"
          >Profile</RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-2">
        <!-- Theme selector -->
        <select
          class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-900"
          :value="pref"
          @change="setPref($event.target.value)"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <!-- User dropdown -->
        <Dropdown>
          <template #button>
            <span class="max-w-[160px] truncate">{{ user?.name || 'User' }}</span>
            <span class="text-gray-400">▾</span>
          </template>

          <div class="py-1">
            <RouterLink
              to="/profile"
              class="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >Edit Profile</RouterLink>

            <button
              class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              @click="onLogout"
            >
              Logout
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import { useAuth } from '../composables/useAuth'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const router = useRouter()
const { user, doLogout } = useAuth()
const { pref, setPref } = useTheme()

function onLogout() {
  doLogout()
  router.push('/login')
}
</script>
