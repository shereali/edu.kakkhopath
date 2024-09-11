<template>
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
          <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Profile</router-link
          >
        </li>
        <li>
          <router-link to="/settings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Settings</router-link
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
</template>

<script setup>
import { ref } from 'vue'

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
  alert('Logged out!')
}

document.addEventListener('click', handleClickOutside)
</script>

<style scoped>
/* Optional: Additional styling can be added here */
</style>
