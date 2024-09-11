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
  linkdin: string
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
    setUser(user: any) {
      this.user = user
      const jsonUser = JSON.stringify(user)
      localStorage.setItem('user', jsonUser)
    },
    removeUser() {
      this.user = null
      localStorage.removeItem('user')
    },
    async fetchUser() {
      try {
        const response = await axios.get<User>('/api/student/me') // Assuming you have an endpoint to get user details

        const user = response.data
        this.setUser(user)
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    },

    setSiteInfo(siteInfo: any) {
      this.siteInfo = siteInfo
      const jsonSetting = JSON.stringify(siteInfo)
      localStorage.setItem('siteInfo', jsonSetting)
    },

    removeSitInfo() {
      this.siteInfo = null
      localStorage.removeItem('siteInfo')
    },

    async fetchSetting() {
      try {
        const response = await axios.get<SiteInfo>('/api/v1/client/general-info') // Assuming you have an endpoint to get user details
        const siteInfo = response.data.general_info
        this.setSiteInfo(siteInfo)
        const menuInfo = response.data.data
        const jsonMenu = JSON.stringify(menuInfo)
        localStorage.setItem('menus', jsonMenu)
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await axios.post<{ token: string }>('/api/student/login', {
          email,
          password
        })
        const token = response.data.token
        this.setToken(token)
        await this.fetchUser()
        await this.fetchSetting()
        router.push('/')
      } catch (error) {
        console.error('Login failed', error)
        throw error // Rethrow error to handle it in the component
      }
    },
    async logout() {
      const response = await axios.post<{ token: string }>('/api/student/logout', {})
      this.removeToken()
      this.removeUser()
      if (response.status === 200) {
        router.push('/login')
      }
    },
    initialize() {
      const token = localStorage.getItem('token')
      const user: any = localStorage.getItem('user')
      const jsonUser = JSON.parse(user)
      const siteInfo: any = localStorage.getItem('siteInfo')
      const jsonSiteInfo = JSON.parse(siteInfo)

      if (token) {
        this.setToken(token)
        this.setUser(jsonUser)
        this.setSiteInfo(jsonSiteInfo)
      }
    }
  }
})
