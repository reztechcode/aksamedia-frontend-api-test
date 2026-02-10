import { onMounted, onUnmounted, ref, watch } from 'vue'
import { LS } from '../storage/keys'
import { readJSON, writeJSON } from '../storage/localdb'

const pref = ref(readJSON(LS.THEME, 'system')) // default: system

function applyTheme() {
  const root = document.documentElement
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode = pref.value === 'system' ? (systemDark ? 'dark' : 'light') : pref.value
  root.classList.toggle('dark', mode === 'dark')
}

export function useTheme() {
  let mql

  const setPref = (v) => (pref.value = v)

  onMounted(() => {
    applyTheme()
    mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (pref.value === 'system') applyTheme()
    }
    mql.addEventListener?.('change', handler)
    mql._handler = handler
  })

  onUnmounted(() => {
    if (mql?._handler) mql.removeEventListener?.('change', mql._handler)
  })

  watch(pref, (v) => {
    writeJSON(LS.THEME, v)
    applyTheme()
  })

  return { pref, setPref }
}
