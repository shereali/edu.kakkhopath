<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const isOpen = ref(false)

// Toggle the dropdown menu
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Close the dropdown menu
const closeDropdown = () => {
  isOpen.value = false
}

// Handle clicks outside of the dropdown menu
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.relative')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    closeDropdown()
  }
}

// Logout functionality
const logout = async () => {
  try {
    await authStore.logout()
    // Redirect to login page if necessary
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="flex flex-row items-center justify-between border-b px-4 py-3">
    <!-- Welcome Section -->
    <div>
      <div class="flex">
        <!-- My Courses Link -->
        <router-link
          v-if="route.params.id"
          class="mr-3 py-3 px-3 rounded-sm text-white text-xl bg-blue-600"
          to="/courses"
        >
          My Courses
        </router-link>

        <!-- Welcome Message -->
        <div>
          <h1 v-if="authStore.user" class="text-xl md:text-2xl font-bold">
            Welcome, {{ authStore.user.first_name }} {{ authStore.user.last_name }}!
          </h1>
          <p class="text-gray-600">Here are your courses and activities</p>
        </div>
      </div>
    </div>

    <!-- User Dropdown -->
    <div class="relative">
      <!-- User Icon -->
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
            <router-link to="/courses" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              My Courses
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </router-link>
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
  </header>
</template>

<style scoped>
/* Add styles for better UX */
.relative {
  position: relative;
}
button {
  cursor: pointer;
}
</style>
