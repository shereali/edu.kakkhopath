<template>
  <div class="coming-soon">
    <header class="header">
      <!-- <img src="@/assets/img/logo.jpg" alt="Kakkhopath Logo" class="logo" /> -->
      <!-- <h1 class="text-3xl">{{ route.name }}</h1> -->
      <h1>Something Exciting is Coming Your Way!</h1>
      <p>Get Ready to Learn, Explore, and Grow.</p>
    </header>

    <main class="main-content">
      <div class="visual">
        <!-- Add an SVG or Image here to represent the learning environment -->
        <img src="@/assets/img/learning.svg" alt="Learning Illustration" class="illustration" />
      </div>
      <div class="countdown">
        <h2>Launching In:</h2>
        <div class="timer">
          <span>{{ days }}<small>Days</small></span>
          <span>{{ hours }}<small>Hours</small></span>
          <span>{{ minutes }}<small>Minutes</small></span>
          <span>{{ seconds }}<small>Seconds</small></span>
        </div>
      </div>

      <div class="learning-mode">
        <h3>Unlock New Skills with Our Unique Learning Mode</h3>
        <div class="learning-icons">
          <Icon name="arcticons:coding-python" />
          <Icon name="flat-color-icons:reading" />
          <Icon name="twemoji:writing-hand" />
        </div>
      </div>

      <form @submit.prevent="subscribe" class="subscription-form">
        <input type="email" v-model="email" placeholder="Enter your email" required />
        <button type="submit">Notify Me!</button>
      </form>
    </main>

    <footer class="footer">
      <p>Follow us on social media for updates!</p>
      <div class="social-icons">
        <!-- Add your social media icons/links here -->
        <a href="#"><Icon name="ic:baseline-facebook" /></a>
        <a href="#"><Icon name="devicon:twitter" /></a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const launchDate = new Date('2024-12-01T00:00:00') // Set your launch date here
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const email = ref('')

const startCountdown = () => {
  setInterval(() => {
    const now = new Date()
    const timeDiff = launchDate - now

    days.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((timeDiff % (1000 * 60)) / 1000)
  }, 1000)
}

const subscribe = () => {
  // Handle the email subscription logic here
  alert(`Thank you for subscribing, ${email.value}!`)
  email.value = ''
}

onMounted(() => {
  startCountdown()
})
</script>

<style scoped>
.coming-soon {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  margin-bottom: 20px;
}

.logo {
  max-width: 100px;
  margin-bottom: 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.illustration {
  max-width: 300px;
  margin-bottom: 20px;
}

.countdown {
  margin: 20px 0;
}

.timer {
  display: flex;
  gap: 10px;
  font-size: 1.5rem;
}

.timer span {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.learning-mode {
  margin: 20px 0;
}

.learning-icons img {
  width: 50px;
  margin: 0 10px;
}

.subscription-form {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.subscription-form input {
  padding: 10px;
  font-size: 1rem;
}

.subscription-form button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.footer {
  margin-top: 20px;
}

.social-icons a {
  margin: 0 10px;
}
</style>
