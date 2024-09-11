<script setup>
// No specific setup needed for footer
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const menu = localStorage.getItem('menus')

const json_menu = JSON.parse(menu)
console.log(json_menu[1].name)
</script>

<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo and Description -->
      <!-- <img class="w-14 h-14" v-if="authStore.siteInfo" :src="authStore.siteInfo.view_logo" alt="" /> -->
      <div v-if="authStore.siteInfo">
        <h2 class="text-2xl font-semibold">
          {{ authStore.siteInfo.site_name }}
        </h2>
        <p class="mt-4 text-gray-400">
          {{ authStore.siteInfo.introduction }}
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-xl font-semibold">Quick Links</h3>
        <ul v-if="json_menu.length != 0" class="mt-4 space-y-2">
          <li><router-link to="/" class="hover:underline">Home</router-link></li>
          <li><router-link to="/courses" class="hover:underline">My Courses</router-link></li>
          <li><router-link to="/profile" class="hover:underline">Profile</router-link></li>
          <li><router-link to="/settings" class="hover:underline">Settings</router-link></li>
          <li><router-link to="/offers" class="hover:underline">Offers</router-link></li>
        </ul>
      </div>

      <!-- Contact and Social Media -->
      <div>
        <h3 class="text-xl font-semibold">Contact Us</h3>
        <ul v-if="authStore.siteInfo" class="mt-4 space-y-2">
          <li>Email: {{ authStore.siteInfo.email }}</li>
          <li>Phone: {{ authStore.siteInfo.phone }}</li>
          <li>Address: {{ authStore.siteInfo.address }}</li>
        </ul>
        <div class="flex mt-4 space-x-4">
          <!-- Social Media Icons -->
          <a href="#" class="hover:text-blue-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.46 6c-.77.35-1.6.59-2.47.7.89-.53 1.57-1.37 1.89-2.37-.84.5-1.76.87-2.74 1.07a4.18 4.18 0 0 0-7.14 3.81 11.88 11.88 0 0 1-8.63-4.37 4.16 4.16 0 0 0 1.29 5.56 4.16 4.16 0 0 1-1.89-.53v.05c0 2.02 1.44 3.7 3.36 4.08a4.24 4.24 0 0 1-1.88.07c.53 1.66 2.08 2.87 3.92 2.9a8.38 8.38 0 0 1-5.18 1.79 8.47 8.47 0 0 1-1-.06 11.84 11.84 0 0 0 6.43 1.89c7.71 0 11.92-6.39 11.92-11.92l-.01-.54a8.5 8.5 0 0 0 2.09-2.17z"
              />
            </svg>
          </a>
          <a href="#" class="hover:text-blue-500">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.58 8.13 8.16 8.93v-6.34h-2.5v-2.58h2.5v-2.17c0-2.47 1.49-3.83 3.7-3.83 1.07 0 2.2.19 2.2.19v2.41h-1.24c-1.22 0-1.6.75-1.6 1.52v1.88h2.74l-.44 2.58h-2.3v6.34c4.58-.8 8.16-4.52 8.16-8.93 0-5.5-4.46-9.96-9.96-9.96z"
              />
            </svg>
          </a>
          <a href="#" class="hover:text-red-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M23.5 6.5c-.8.4-1.6.7-2.4.8.9-.6 1.6-1.4 1.9-2.4-.8.5-1.7.9-2.6 1.1-.8-.8-2-1.2-3.2-1.2-2.5 0-4.5 2-4.5 4.5 0 .4 0 .7.1 1.1-3.8-.2-7.1-2-9.3-4.7-.4.7-.6 1.5-.6 2.3 0 1.6.8 3.1 2 4-.7 0-1.4-.2-2-.6v.1c0 2.3 1.6 4.1 3.7 4.5-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 2 2.3 3.4 4.3 3.4-1.6 1.3-3.7 2.1-6 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.3 7.6 2.3 9.1 0 14-7.5 14-14v-.6c1-.8 1.8-1.6 2.5-2.7z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Line and Copyright -->
    <div class="bg-gray-900 text-center py-4">
      <p v-if="authStore.siteInfo" class="text-gray-400 text-sm">
        © 2024 {{ authStore.siteInfo.site_name }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
/* Additional styles can be added here */
</style>
