<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div class="text-sm text-gray-600 dark:text-gray-300">
      Page <span class="font-semibold">{{ pagination.current_page }}</span> / {{ pagination.last_page }}
      · Total <span class="font-semibold">{{ pagination.total }}</span>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:hover:bg-gray-800"
        :disabled="pagination.current_page <= 1"
        @click="$emit('change', pagination.current_page - 1)"
      >
        Prev
      </button>

      <button
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:hover:bg-gray-800"
        :disabled="pagination.current_page >= pagination.last_page"
        @click="$emit('change', pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pagination: { type: Object, required: true },
})
defineEmits(['change'])
</script>
