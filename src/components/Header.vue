<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
// const user = localStorage.getItem('user')
// const jsonUser = JSON.parse(user)
// const full_name = jsonAuthStore.user?.first_name + ' ' + jsonAuthStore.user?.last_name
const isOpen = ref(false)
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

// Close the dropdown if clicked outside
function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

function logout() {
  // Implement your logout logic here
  authStore.logout()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="flex flex-row lg:items-center justify-between border-b lg:space-y-0 px-4">
    <div>
      <h1 v-if="authStore.user" class="text-xl md:text-2xl font-bold">
        Welcome, {{ authStore.user.first_name }} {{ authStore.user.last_name }}!
      </h1>
      <p class="text-gray-600">Here are your courses and activities</p>
    </div>
    <!-- <div
      class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full lg:w-auto"
    > -->
    <!-- <input
        type="text"
        placeholder="Search..."
        class="px-4 py-2 border rounded w-full sm:w-auto"
      /> -->

    <div class="relative">
      <!-- User Icon with Click Event -->
      <button @click="toggleDropdown" class="focus:outline-none">
        <svg
          class="w-8 h-8 text-gray-600 hover:text-gray-800"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
        <ul class="py-1">
          <li>
            <router-link to="/courses" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >My Courses</router-link
            >
          </li>
          <li>
            <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >Profile</router-link
            >
          </li>
          <li>
            <button
              @click="logout"
              class="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- </div> -->
  </header>
</template>

<style scoped>
/* Add any additional styles here */
</style>
