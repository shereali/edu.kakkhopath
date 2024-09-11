<script setup>
import axios from 'axios'
import { ref } from 'vue'

let courses = ref([])
const is_data_loaded = ref(false)
const singleCourse = async () => {
  await axios.get(`/api/student/courses`).then((res) => {
    if (res.status == 200) {
      courses.value = res.data.data.courses
      is_data_loaded.value = true
    }
  })
}

singleCourse()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-4xl text-blue-600 dark:text-gray-300 mb-4 font-nakkhatra">
      সবগুলো কোর্স একসাথে
    </h2>
    <p class="text-xl text-gray-700 mb-8 font-nakkhatra">
      শিখুন, গড়ুন, এগিয়ে যান—আমাদের কোর্সের সাথে আপনার স্বপ্নকে বাস্তব করুন!
    </p>
    <div v-if="is_data_loaded" class="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <router-link
        v-for="(course, index) in courses"
        :key="index"
        :to="`/course/${course.id}`"
        class="max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden bg-gray-200 dark:bg-slate-950"
        data-aos="fade-up"
        :data-aos-duration="500 * index"
      >
        <img :src="course.thumbnail" alt="Course Image" class="h-48 w-full object-cover" />
        <div class="p-4">
          <h3 class="text-xl text-slate-950 dark:text-white mb-2 font-nakkhatra">
            {{ course.title }}
          </h3>
          <p class="text-lg text-gray-700 mb-4">
            {{ course.description }}
          </p>
          <!-- <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-star text-yellow-500"></i>
                        <i class="fas fa-star text-yellow-500"></i>
                        <i class="fas fa-star text-yellow-500"></i>
                        <i class="fas fa-star text-yellow-500"></i>
                        <i class="far fa-star text-yellow-500"></i>
                        <span class="text-sm text-gray-600"
                            >({{ course.ratings }} ratings)</span
                        >
                    </div> -->
          <!-- <div
                        class="flex items-baseline justify-between border-b border-slate-600 my-5"
                    >
                        <span
                            class="text-lg font-bold text-blue-600 font-nakkhatra"
                            >৳{{ course.price }}</span
                        >
                        <span
                            class="text-sm text-gray-600 line-through font-nakkhatra"
                            >৳{{ course.regular_price }}</span
                        >
                    </div> -->
          <div class="flex items-center justify-center">
            <a
              href=""
              class="py-1 px-10 text-white rounded-full shadow dark:bg-yellow-600-600 bg-orange-950 font-nakkhatra"
              >View Course</a
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Custom CSS rules */
</style>
