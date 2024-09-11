<script setup lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import axios from 'axios'
import { ref } from 'vue'

// const courses = ref([])
// const getCourses = async () => {
//   await axios.get('/api/student/courses').then((res) => {
//     if (res.status === 200) {
//       console.log(res.data)
//     }
//   })
// }

// getCourses()
</script>
<template>
  <div>
    <course-card></course-card>
  </div>
</template>
