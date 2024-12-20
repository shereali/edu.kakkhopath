<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Profile Header -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center md:items-start">
        <img
          :src="student.profilePicture"
          alt="Profile Picture"
          class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500 mb-4 md:mb-0 md:mr-6"
        />
        <div class="w-full">
          <div v-if="!isEditing">
            <h1 class="text-3xl font-semibold text-gray-800 mb-2">
              {{ student.name }}
            </h1>
            <p class="text-gray-600 mb-4">
              {{ student.bio }}
            </p>
            <div class="flex items-center space-x-4">
              <p class="text-gray-600"><strong>Email:</strong> {{ student.email }}</p>
              <p class="text-gray-600">
                <strong>Enrolled Since:</strong> {{ student.enrollmentDate }}
              </p>
            </div>
            <button
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              @click="toggleEdit"
            >
              Edit Profile
            </button>
          </div>

          <!-- Edit Form -->
          <div v-else>
            <form @submit.prevent="updateProfile">
              <div class="mb-4">
                <label for="name" class="block text-gray-700 font-medium"> Name </label>
                <input
                  type="text"
                  id="name"
                  v-model="editableStudent.name"
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="mb-4">
                <label for="bio" class="block text-gray-700 font-medium"> Bio </label>
                <textarea
                  id="bio"
                  v-model="editableStudent.bio"
                  rows="3"
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 font-medium"> Email </label>
                <input
                  type="email"
                  id="email"
                  v-model="editableStudent.email"
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="flex space-x-4">
                <button
                  type="submit"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  @click="cancelEdit"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div class="bg-blue-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Courses Completed</h3>
        <p class="text-4xl font-bold">{{ student.coursesCompleted }}</p>
      </div>
      <div class="bg-green-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Quizzes Taken</h3>
        <p class="text-4xl font-bold">{{ student.quizzesTaken }}</p>
      </div>
      <div class="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Total Points</h3>
        <p class="text-4xl font-bold">{{ student.points }}</p>
      </div>
    </div>

    <!-- Courses Section -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Enrolled Courses</h2>
      <div v-if="student.courses.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(course, index) in student.courses"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <h3 class="text-xl font-semibold text-gray-700">{{ course.title }}</h3>
          <p class="text-gray-600 mb-2">Instructor: {{ course.instructor }}</p>
          <p class="text-gray-600 mb-2">Progress: {{ course.progress }}%</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-500 h-2.5 rounded-full"
              :style="{ width: `${course.progress}%` }"
            ></div>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-600">No courses enrolled yet.</p>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <ul>
        <li
          v-for="(activity, index) in student.recentActivities"
          :key="index"
          class="mb-3 text-gray-600"
        >
          - {{ activity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const student = reactive({
  profilePicture: 'https://via.placeholder.com/150', // Replace with the actual image URL
  name: `${authStore.user.first_name} ${authStore.user.last_name}`,
  bio: 'A passionate programmer learning full-stack development.',
  email: `${authStore.user.email}`,
  enrollmentDate: '',
  coursesCompleted: 5,
  quizzesTaken: 12,
  points: 950,
  courses: [
    {
      title: 'JavaScript for Beginners',
      instructor: 'Jane Smith',
      progress: 75
    },
    {
      title: 'Mastering Vue.js',
      instructor: 'Mark Lee',
      progress: 50
    },
    {
      title: 'Advanced CSS Techniques',
      instructor: 'Anna Brown',
      progress: 100
    }
  ],
  recentActivities: [
    'Completed a quiz on JavaScript Basics.',
    "Watched 'Introduction to Vue.js' video.",
    "Scored 85% on the 'CSS Advanced' quiz."
  ]
})

const isEditing = ref(false)

// Clone student data for editing
const editableStudent = reactive({ ...student })

const toggleEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  Object.assign(editableStudent, student) // Reset to original values
}

const updateProfile = () => {
  // Save changes
  Object.assign(student, editableStudent)
  isEditing.value = false
  alert('Profile updated successfully!')
}
</script>
