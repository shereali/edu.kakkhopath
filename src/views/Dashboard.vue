<template>
  <!-- Student Overview -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Course Progress</h3>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: `${courseProgress}%` }"></div>
      </div>
      <p class="text-gray-600">{{ courseProgress }}% Completed</p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Upcoming Lessons</h3>
      <ul>
        <li v-for="(lesson, index) in student.upcomingLessons" :key="index" class="mb-2">
          <span class="font-semibold">{{ lesson.title }}</span> - Due in {{ lesson.dueDays }} days
        </li>
      </ul>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Recent Activities</h3>
      <ul>
        <li
          v-for="(activity, index) in student.recentActivities"
          :key="index"
          class="mb-2 text-gray-600"
        >
          {{ activity }}
        </li>
      </ul>
    </div>
  </div>

  <!-- Video Course List -->
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Video Courses</h3>
    <div
      v-for="(course, index) in courses"
      :key="index"
      class="flex justify-between items-center mb-4"
    >
      <div class="text-gray-800">{{ course.title }}</div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" @click="playVideo(course.id)">
        Watch Video
      </button>
    </div>
  </div>

  <!-- Leaderboard -->
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Leaderboard</h3>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-gray-600">Rank</th>
          <th class="px-4 py-2 text-left text-gray-600">Student Name</th>
          <th class="px-4 py-2 text-left text-gray-600">Total Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leader, index) in leaderboard" :key="index" class="border-b">
          <td class="px-4 py-2 text-gray-800">{{ index + 1 }}</td>
          <td class="px-4 py-2 text-gray-800">{{ leader.name }}</td>
          <td class="px-4 py-2 text-gray-800">{{ leader.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Notifications -->
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Notifications</h3>
    <ul>
      <li v-for="(notification, index) in notifications" :key="index" class="mb-2">
        {{ notification }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: ['Dashboard', 'Courses', 'Leaderboard', 'Profile'],
      student: {
        name: 'John Doe',
        upcomingLessons: [
          { title: 'Lesson 5: Functions', dueDays: 2 },
          { title: 'Lesson 6: Object-Oriented Programming', dueDays: 4 }
        ],
        recentActivities: [
          'Completed Quiz 1 - Score: 85%',
          'Started Lesson 3 - Loops and Iterations'
        ]
      },
      courseProgress: 80,
      courses: [
        { id: 1, title: 'Introduction to JavaScript' },
        { id: 2, title: 'HTML & CSS Basics' },
        { id: 3, title: 'Advanced JavaScript' }
      ],
      leaderboard: [
        { name: 'John Doe', points: 950 },
        { name: 'Jane Smith', points: 890 },
        { name: 'Mark Lee', points: 880 }
      ],
      notifications: [
        'New Lesson Available: Introduction to Functions',
        'Quiz 1 Results: You scored 85%',
        'Your next assignment is due in 2 days.'
      ]
    }
  },
  methods: {
    playVideo(courseId) {
      alert(`Playing video for course ID: ${courseId}`)
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
