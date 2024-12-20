<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const course_module = ref([])
const is_loaded_data = ref(false)
const has_error = ref(false)

const getCourseModule = async () => {
  try {
    const res = await axios.get(`/api/student/course/${route.params.id}`)
    if (res.status === 200) {
      course_module.value = res.data.data
      console.log('course_module', res.data.data)
    } else {
      console.error('Unexpected response status:', res.status)
      has_error.value = true
    }
  } catch (error) {
    console.error('Error fetching course module:', error)
    has_error.value = true
  } finally {
    is_loaded_data.value = true
  }
}

onMounted(() => {
  if (route.params.id) {
    getCourseModule()
  } else {
    console.error('Route parameter "id" is missing.')
    has_error.value = true
    is_loaded_data.value = true
  }
})
</script>

<template>
  <div>
    <video-player
      v-if="is_loaded_data && course_module.length > 0 && !has_error"
      :course_module="course_module"
    ></video-player>
    <div class="text-3xl text-red-700 p-5" v-else-if="is_loaded_data && has_error">
      Unable to load course modules. Please try again later.
    </div>
    <div class="text-3xl text-red-700 p-5" v-else-if="is_loaded_data && course_module.length === 0">
      There is no module in this course.
    </div>
    <Loading :loading="!is_loaded_data" />
  </div>
</template>
