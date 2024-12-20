<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import CourseCard from '@/components/CourseCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

// Reactive state to store courses
const courses = ref([] as Array<{ id: number; name: string; description: string }>) // Adjust course properties as needed
const is_loaded_data = ref(false)
const has_error = ref(false)

// Fetch courses from the API
const getCourses = async () => {
  try {
    const res = await axios.get('/api/student/courses')
    if (res.status === 200 && res.data.data && Array.isArray(res.data.data.courses)) {
      courses.value = res.data.data.courses // Assuming API response: { data: [...] }
      // console.log('Fetched courses:', res.data.data)
    } else {
      console.error('Unexpected response or data structure:', res)
      has_error.value = true
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    has_error.value = true
  } finally {
    is_loaded_data.value = true
  }
}

// Call the function on component mount
onMounted(() => {
  getCourses()
})
</script>

<template>
  <div>
    <!-- Show a loading spinner while data is being fetched -->
    <div v-if="!is_loaded_data && !has_error" class="text-center text-gray-500">
      <Loading :loading="!is_loaded_data" />
    </div>

    <!-- Display error message if data fetching fails -->
    <div v-else-if="has_error" class="text-center text-red-500">
      Failed to load courses. Please try again later.
    </div>

    <!-- Render courses when data is loaded -->
    <div v-else>
      <div v-if="courses.length > 0">
        <CourseCard v-for="course in courses" :key="course.id" :course="course" />
      </div>
      <div v-else class="text-center text-gray-500">No courses available at the moment.</div>
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

.text-red-500 {
  color: #ef4444;
}
</style>
