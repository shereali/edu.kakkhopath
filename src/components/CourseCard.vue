<script setup>
import axios from 'axios'
import { ref } from 'vue'

let courses = ref([])
const is_data_loaded = ref(false)

const singleCourse = async () => {
  try {
    const res = await axios.get(`/api/student/courses`)
    if (res.status === 200) {
      courses.value = res.data.data.courses
      is_data_loaded.value = true
    } else {
      console.error('Failed to fetch courses:', res)
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
  }
}

singleCourse()
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h2 class="text-4xl text-blue-600 dark:text-gray-300 mb-6 font-nakkhatra">
      সবগুলো কোর্স একসাথে
    </h2>
    <p class="text-xl text-gray-700 mb-12 font-nakkhatra">
      শিখুন, গড়ুন, এগিয়ে যান—আমাদের কোর্সের সাথে আপনার স্বপ্নকে বাস্তব করুন!
    </p>

    <div v-if="is_data_loaded" class="grid lg:grid-cols-4 md:grid-cols-3 gap-8">
      <router-link
        v-for="(course, index) in courses"
        :key="index"
        :to="`/course/${course.id}`"
        class="rounded-lg shadow-lg overflow-hidden bg-gray-200 dark:bg-slate-950 transform transition-transform hover:scale-105"
        data-aos="fade-up"
        :data-aos-duration="500 * index"
      >
        <img :src="course.thumbnail" alt="Course Image" class="h-64 w-full object-cover" />
        <div class="p-6">
          <h3 class="text-2xl text-slate-950 dark:text-white mb-3 font-nakkhatra">
            {{ course.title }}
          </h3>
          <p class="text-base text-gray-700 mb-6 line-clamp-3">
            {{ course.description }}
          </p>
          <div class="flex items-center justify-center">
            <a
              href=""
              class="py-2 px-8 text-white rounded-full shadow-lg bg-orange-600 dark:bg-yellow-600 hover:bg-orange-700"
            >
              View Course
            </a>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Fix card size and layout */
.container {
  min-height: 100vh;
  padding-bottom: 4rem; /* Prevent overlap with footer */
}

/* Add spacing around cards */
.grid {
  margin-bottom: 2rem;
}

/* Fix potential overflow and enhance styling */
.router-link {
  max-width: 100%;
}

/* Truncate long descriptions */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
