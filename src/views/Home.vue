<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import speak from '@/utils/speak'
speak(`Dear ${authStore.user?.first_name} ${authStore.user?.last_name} welcome to student panel`)
</script>

<template>
  <div class="text-green-600 text-3xl py-10">Welcome to student panel!</div>
</template>
