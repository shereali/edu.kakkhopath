<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const course_module = ref([])
const is_loaded_data = ref(false)
const getCourseModule = async () => {
  await axios.get(`/api/student/course/${route.params.id}`).then((res) => {
    if (res.status === 200) {
      course_module.value = res.data.data

      console.log('course_module', res.data.data)

      is_loaded_data.value = true
    }
  })
}

getCourseModule()
</script>
<template>
  <video-player
    v-if="is_loaded_data && course_module.length > 0"
    :course_module="course_module"
  ></video-player>
  <div class="text-3xl text-red-700 p-5" v-else>There is no module in this course</div>
</template>
