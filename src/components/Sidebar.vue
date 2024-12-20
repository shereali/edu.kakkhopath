<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// You can add any additional setup or data handling here.
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <aside class="w-64 bg-gray-800 text-white p-4 hidden lg:block">
    <div class="p-4">
      <!-- <div v-if="authStore.siteInfo" class="flex item-center w-20 h-20">
        <img :src="authStore.siteInfo.view_logo" alt="" />
      </div> -->
      <h2 v-if="authStore.siteInfo" class="text-xl font-semibold">
        <!-- <router-link to="/">{{ authStore.siteInfo.site_name }}</router-link> -->
        Student Dashboard
      </h2>
    </div>
    <nav class="mt-4">
      <ul>
        <li
          class="px-4 py-2 hover:bg-gray-950"
          :class="{ 'bg-gray-950': route.path == '/dashboard' }"
        >
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li
          class="px-4 py-2 hover:bg-gray-950"
          :class="{ 'bg-gray-950': route.path == '/courses' }"
        >
          <router-link to="/courses">My Courses</router-link>
        </li>
        <li
          class="px-4 py-2 hover:bg-gray-950"
          :class="{ 'bg-gray-950': route.path == '/profile' }"
        >
          <router-link to="/profile">Profile</router-link>
        </li>
        <li
          class="px-4 py-2 hover:bg-gray-950"
          :class="{ 'bg-gray-950': route.path == '/settings' }"
        >
          <router-link to="/settings">Settings</router-link>
        </li>
        <li class="px-4 py-2 hover:bg-gray-950" :class="{ 'bg-gray-950': route.path == '/offers' }">
          <router-link to="/offers">Offers</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Add any additional styles here */
</style>
