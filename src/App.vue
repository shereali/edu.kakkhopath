<!-- App.vue -->
<!-- <template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 p-6">
      <Header />
      <MainContent />
    </div>
  </div>
  <router-view />
</template> -->
<template>
  <div v-if="route.name !== 'Login'">
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar Component -->
      <Sidebar v-if="route.name !== 'CourseDetails'" />

      <!-- Main Content Area -->
      <div class="flex-1 p-6">
        <!-- Header Component -->
        <Header />

        <!-- Slot for Custom Content or Nested Router Views -->
        <slot />

        <!-- Router View for Displaying Page Components -->
        <router-view />
      </div>
    </div>
    <Footer v-if="route.name !== 'CourseDetails'" />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import MainContent from '@/components/MainContent.vue'
import Footer from '@/components/Footer.vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>
