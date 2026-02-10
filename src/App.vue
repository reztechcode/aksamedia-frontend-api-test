<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
    <Navbar v-if="route.path !== '/login'" />

    <main class="mx-auto max-w-6xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

watch(
  () => route.meta.title,
  (newTitle) => {
    document.title = newTitle ? `${newTitle} | My App` : 'My App'
  },
  { immediate: true }
)
</script>
