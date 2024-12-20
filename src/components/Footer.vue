<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const siteInfo = computed(() => authStore.siteInfo)

const menu = localStorage.getItem('menus')
const json_menu = menu ? JSON.parse(menu) : []
console.log(json_menu[1]?.name)
</script>

<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo and Description -->
      <div v-if="siteInfo">
        <h2 class="text-2xl font-semibold">
          {{ siteInfo.site_name }}
        </h2>
        <p class="mt-4 text-gray-400">
          {{ siteInfo.introduction }}
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-xl font-semibold">Quick Links</h3>
        <ul v-if="Array.isArray(json_menu) && json_menu.length > 0" class="mt-4 space-y-2">
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
        <ul v-if="siteInfo" class="mt-4 space-y-2">
          <li>Email: {{ siteInfo.email }}</li>
          <li>Phone: {{ siteInfo.phone }}</li>
          <li>Address: {{ siteInfo.address }}</li>
        </ul>
        <div class="flex mt-4 space-x-4">
          <a href="#" class="hover:text-blue-400"> <!-- Twitter Icon --></a>
          <a href="#" class="hover:text-blue-500"> <!-- Facebook Icon --></a>
          <a href="#" class="hover:text-red-600"> <!-- YouTube Icon --></a>
        </div>
      </div>
    </div>

    <!-- Bottom Line and Copyright -->
    <div class="bg-gray-900 text-center py-4">
      <p v-if="siteInfo" class="text-gray-400 text-sm">
        © 2024 {{ siteInfo.site_name }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
/* Additional styles can be added here */
</style>
