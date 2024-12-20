<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Settings Container -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Site Settings</h2>

      <!-- Form Section -->
      <form @submit.prevent="saveSettings">
        <!-- Site Name -->
        <div class="mb-6">
          <label for="siteName" class="block text-gray-700 font-medium">Site Name</label>
          <input
            type="text"
            id="siteName"
            v-model="settings.siteName"
            class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter site name"
            required
          />
        </div>

        <!-- Site Logo -->
        <div class="mb-6">
          <label for="logo" class="block text-gray-700 font-medium">Site Logo</label>
          <input
            type="file"
            id="logo"
            @change="handleLogoUpload"
            class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="mt-2 text-gray-500">Upload a logo image (optional)</p>
          <img
            v-if="logoPreview"
            :src="logoPreview"
            alt="Logo Preview"
            class="mt-4 w-32 h-32 object-cover rounded-full"
          />
        </div>

        <!-- Contact Email -->
        <div class="mb-6">
          <label for="contactEmail" class="block text-gray-700 font-medium">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            v-model="settings.contactEmail"
            class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact email"
            required
          />
        </div>

        <!-- Theme Preference -->
        <div class="mb-6">
          <label for="theme" class="block text-gray-700 font-medium">Theme Preference</label>
          <select
            id="theme"
            v-model="settings.theme"
            class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const settings = reactive({
  siteName: 'My Awesome Website',
  contactEmail: 'contact@example.com',
  theme: 'light'
})

const logoPreview = ref(null)

// Handle logo upload
const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      logoPreview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// Save settings
const saveSettings = () => {
  // You can make an API call to save the settings
  console.log('Settings saved:', settings)
  alert('Settings saved successfully!')
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
