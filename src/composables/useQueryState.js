import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useQueryState() {
  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page || 1),
    set: (v) => router.replace({ query: { ...route.query, page: String(v) } }),
  })

  const search = computed({
    get: () => String(route.query.search || ''),
    set: (v) => router.replace({ query: { ...route.query, search: v || undefined, page: '1' } }),
  })

  const division_id = computed({
    get: () => String(route.query.division_id || ''),
    set: (v) => router.replace({ query: { ...route.query, division_id: v || undefined, page: '1' } }),
  })

  return { page, search, division_id }
}
