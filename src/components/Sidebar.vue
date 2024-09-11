<script setup>
// You can add any additional setup or data handling here.
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <aside class="w-64 bg-white shadow-lg">
    <div class="p-4">
      <!-- <div v-if="authStore.siteInfo" class="flex item-center w-20 h-20">
        <img :src="authStore.siteInfo.view_logo" alt="" />
      </div> -->
      <h2 v-if="authStore.siteInfo" class="text-xl font-semibold">
        <router-link to="/">{{ authStore.siteInfo.site_name }}</router-link>
      </h2>
    </div>
    <nav class="mt-4">
      <ul>
        <li class="px-4 py-2 hover:bg-gray-200">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="px-4 py-2 hover:bg-gray-200">
          <router-link to="/courses">My Courses</router-link>
        </li>
        <li class="px-4 py-2 hover:bg-gray-200">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li class="px-4 py-2 hover:bg-gray-200">
          <router-link to="/settings">Settings</router-link>
        </li>
        <li class="px-4 py-2 hover:bg-gray-200"><router-link to="/offers">Offers</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Add any additional styles here */
</style>
