import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import EmployeesIndex from '../pages/EmployeesIndex.vue'
import EmployeeForm from '../pages/EmployeeForm.vue'
import Profile from '../pages/Profile.vue'
import { getSession } from '../services/auth.local'

const routes = [
  { path: '/', redirect: '/employees' },
  { path: '/login', component: Login, meta: { guestOnly: true, title: 'Login' } },
  { path: '/employees', component: EmployeesIndex, meta: { requiresAuth: true, title: 'Employees' } },
  { path: '/employees/create', component: EmployeeForm, meta: { requiresAuth: true, title: 'Add Employee' } },
  { path: '/employees/:id/edit', component: EmployeeForm, meta: { requiresAuth: true, title: 'Edit Employee' } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true, title: 'Profile' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authed = !!getSession()
  if (to.meta.requiresAuth && !authed) return '/login'
  if (to.meta.guestOnly && authed) return '/employees'
})

export default router
