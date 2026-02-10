import { ref } from 'vue'
import * as Auth from '../services/auth'

const user = ref(Auth.getUser())
const session = ref(Auth.getSession())

export function useAuth() {
  const isAuthed = () => !!Auth.getSession()

  const doLogin = async (payload) => {
    const res = await Auth.login(payload)
    if (res.ok) {
      user.value = Auth.getUser()
      session.value = Auth.getSession()
    }
    return res
  }

  const doLogout = async () => {
    await Auth.logout()
    session.value = null
    user.value = null
  }

  const refreshUser = () => {
    user.value = Auth.getUser()
  }

  return { user, session, isAuthed, doLogin, doLogout, refreshUser }
}
