<template>
  <div>
    <h1 class="text-3xl text-gray-600 py-3">Welcome to Dashboard</h1>
    <h2 class="text-xl text-gray-500">Your registration info</h2>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left py-3 px-4 font-semibold text-sm border-b">Field</th>
          <th class="text-left py-3 px-4 font-semibold text-sm border-b">Value</th>
        </tr>
      </thead>
      <tbody v-if="authStore.user">
        <tr>
          <td class="py-2 px-4 border-b">First Name</td>
          <td class="py-2 px-4 border-b">{{ authStore.user?.first_name }}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">Last Name</td>
          <td class="py-2 px-4 border-b">{{ authStore.user?.last_name }}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">Email</td>
          <td class="py-2 px-4 border-b">{{ authStore.user?.email }}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">Phone</td>
          <td class="py-2 px-4 border-b">{{ authStore.user?.phone_number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
