<template>
  <main>
    <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="course in courses" :key="course.id" class="p-4 bg-white rounded shadow">
        <h3 class="text-lg font-semibold">{{ course.title }}</h3>
        <p class="text-sm text-gray-500">{{ course.description }}</p>
        <div class="mt-2">
          <progress-bar :progress="course.progress" />
        </div>
        <button class="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Resume Course
        </button>
      </div>
    </section>

    <!-- Additional sections for Profile, Settings, Offers -->
  </main>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue'

// Example data
const courses = [
  { id: 1, title: 'Intro to Python', description: 'Learn Python from scratch', progress: 60 },
  {
    id: 2,
    title: 'Web Development',
    description: 'Build websites using HTML, CSS, and JavaScript',
    progress: 80
  }
  // Add more courses
]
</script>

<style scoped>
/* Add any additional styles here */
</style>
