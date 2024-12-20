// src/stores/auth.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

// Define interfaces for state
interface AuthState {
  token: string | null
  user: User | null
  siteInfo: SiteInfo | null
}

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  // Add other user properties as needed
}

interface SiteInfo {
  id: number
  site_name: string
  email: string
  phone: string
  logo: string
  view_logo: string
  introduction: string
  address: string
  facebook: string
  youtube: string
  instagram: string
  twitter: string
  linkedin: string // Fixed typo from 'linkdin'
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    siteInfo: null
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    removeToken() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    removeUser() {
      this.user = null
      localStorage.removeItem('user')
    },
    async fetchUser() {
      try {
        const response = await axios.get<User>('/api/student/me')
        this.setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw new Error('Unable to fetch user data.')
      }
    },
    setSiteInfo(siteInfo: SiteInfo) {
      this.siteInfo = siteInfo
      localStorage.setItem('siteInfo', JSON.stringify(siteInfo))
    },
    removeSiteInfo() {
      // Renamed from removeSitInfo
      this.siteInfo = null
      localStorage.removeItem('siteInfo')
    },
    async fetchSetting() {
      try {
        const response = await axios.get<{ general_info: SiteInfo; data: any }>(
          '/api/v1/client/general-info'
        )
        const { general_info, data } = response.data
        this.setSiteInfo(general_info)
        localStorage.setItem('menus', JSON.stringify(data))
      } catch (error) {
        console.error('Failed to fetch settings:', error)
        throw new Error('Unable to fetch site settings.')
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await axios.post<{ token: string }>('/api/student/login', {
          email,
          password
        })
        const { token } = response.data
        this.setToken(token)
        await this.fetchUser()
        await this.fetchSetting()

        router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
        throw new Error('Invalid login credentials.')
      }
    },
    async logout() {
      try {
        await axios.post('/api/student/logout')
        this.removeToken()
        this.removeUser()
        this.removeSiteInfo()
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
        throw new Error('Unable to logout. Please try again.')
      }
    },
    initialize() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      const siteInfo = localStorage.getItem('siteInfo')

      if (token) {
        this.setToken(token)
      }

      if (user) {
        try {
          this.setUser(JSON.parse(user))
        } catch {
          console.warn('Invalid user data in localStorage. Clearing user data.')
          this.removeUser()
        }
      }

      if (siteInfo) {
        try {
          this.setSiteInfo(JSON.parse(siteInfo))
        } catch {
          console.warn('Invalid site info in localStorage. Clearing site info.')
          this.removeSiteInfo()
        }
      }
    }
  }
})
