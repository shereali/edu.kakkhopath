<template>
  <div class="flex flex-col lg:flex-row lg:space-x-6 p-4">
    <!-- Video Player Section -->

    <div class="flex-1 relative">
      <div class="relative video-container">
        <template v-if="currentVideo.has_video_file">
          <video
            ref="videoPlayer"
            class="w-full h-auto object-cover"
            controlslist="nodownload"
            @ended="handleVideoEnd"
            controls
          >
            <source :src="currentVideo.video_uploaded_file" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </template>
        <template v-else-if="currentVideo.has_video_source">
          <iframe
            :src="`https://www.youtube.com/embed/${currentVideo.video_source}?controls=1`"
            class="w-full h-auto"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </template>
      </div>
      <div class="h-14"></div>
      <!-- Navigation Buttons -->
      <div
        class="absolute bottom-0 -mt-5 left-0 w-full flex justify-between items-center bg-gray-900 text-white p-2"
      >
        <button
          @click="previousVideo"
          :disabled="currentIndex === 0 && currentSectionIndex === 0"
          class="bg-gray-700 p-2 rounded hover:bg-gray-600 disabled:opacity-50 text-sm lg:text-base"
        >
          Previous
        </button>
        <button
          @click="nextVideo"
          :disabled="isLastVideo"
          class="bg-blue-500 p-2 rounded hover:bg-blue-400 disabled:opacity-50 text-sm lg:text-base"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Playlist Section -->
    <div
      class="w-full lg:w-1/4 p-4 bg-gray-100 border-t border-gray-300 lg:border-t-0 lg:border-l overflow-y-auto"
    >
      <ul>
        <li v-for="(section, sectionIndex) in sections" :key="section.id" class="mb-4">
          <!-- Section Header with Caret Icon -->
          <button
            class="w-full text-left p-2 font-bold bg-gray-300 hover:bg-gray-400 rounded flex justify-between items-center"
            @click="toggleSection(sectionIndex)"
          >
            <span class="text-sm lg:text-base">{{ section.module_title }}</span>
            <span :class="['transition-transform', section.expanded ? 'rotate-90' : '']"> ▼ </span>
          </button>

          <!-- Video List -->
          <ul v-if="section.expanded" class="mt-2">
            <li v-for="(video, videoIndex) in section.module_topic" :key="video.id" class="mb-2">
              <button
                :class="[
                  'w-full text-left p-2 rounded flex items-center space-x-4',
                  {
                    'bg-blue-500 text-white':
                      sectionIndex === currentSectionIndex && videoIndex === currentIndex,
                    'bg-gray-200': !(
                      sectionIndex === currentSectionIndex && videoIndex === currentIndex
                    )
                  }
                ]"
                @click="playVideo(sectionIndex, videoIndex)"
              >
                <!-- <img
                  :src="video.thumbnail"
                  class="w-16 h-12 object-cover rounded"
                  alt="Thumbnail"
                /> -->
                <span class="text-sm lg:text-base">{{ video.topic_title }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!-- Course Details Section -->
  <div class="p-4 bg-gray-100 border-t border-gray-300 mt-4">
    <h2 class="text-lg font-semibold">{{ courseBroadTitle }}</h2>
    <!-- <div class="flex items-center space-x-4 mt-1 text-sm lg:text-base">
      <span>⭐ {{ ratings }} / 5</span>
      <span>👥 {{ studentsCount }} students</span>
      <span>⏰ {{ totalHours }} hours</span>
    </div> -->
    <!-- <p class="mt-2"><strong>Description:</strong> {{ courseDescription }}</p> -->
    <p class="mt-2" v-if="courseInstruction != null">
      <strong>Instruction:</strong> {{ courseInstruction }}
    </p>
    <!-- <p class="mt-2"><strong>Requirement:</strong> {{ courseRequirement }}</p> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  course_module: {
    type: Array,
    required: true
  }
})

const courseBroadTitle = props.course_module[0].course_title
const ratings = 4.8
const studentsCount = 1200
const totalHours = 50
const courseDescription =
  'This course covers everything from basics to advanced topics in web development.'
const courseInstruction = props.course_module[0].instruction
const courseRequirement = 'Basic understanding of HTML, CSS, and JavaScript.'

const currentSectionIndex = ref(0)
const currentIndex = ref(0)
const sections = props.course_module

const currentVideo = computed(
  () => sections[currentSectionIndex.value].module_topic[currentIndex.value]
)

console.log('currentVideo', currentVideo.value)

const videoPlayer = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const progress = ref(0)

onMounted(() => {
  if (currentVideo.value.has_video_file === true) {
    videoPlayer.value?.addEventListener('timeupdate', updateProgress)
    console.log('video_player', videoPlayer.value)
  }
})

const playPauseVideo = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play()
    isPlaying.value = true
  } else {
    videoPlayer.value.pause()
    isPlaying.value = false
  }
}

const toggleMute = () => {
  videoPlayer.value.muted = !videoPlayer.value.muted
  isMuted.value = videoPlayer.value.muted
}

const updateProgress = () => {
  progress.value = (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
}

const seekVideo = (event) => {
  videoPlayer.value.currentTime = (event.target.value / 100) * videoPlayer.value.duration
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable fullscreen mode:', err)
    })
  } else {
    document.exitFullscreen().catch((err) => {
      console.error('Error attempting to exit fullscreen mode:', err)
    })
  }
}

const playVideo = (sectionIndex, videoIndex) => {
  currentSectionIndex.value = sectionIndex
  currentIndex.value = videoIndex

  // Ensure the video player reference is present before trying to play
  if (videoPlayer.value) {
    // Pause the current video
    videoPlayer.value.pause()

    // Reset the source and reload the video
    videoPlayer.value.load()

    // Play the new video
    videoPlayer.value.play()
  }
}

const nextVideo = () => {
  if (currentIndex.value < sections[currentSectionIndex.value].module_topic.length - 1) {
    currentIndex.value += 1
  } else if (currentSectionIndex.value < sections.length - 1) {
    currentSectionIndex.value += 1
    currentIndex.value = 0
  }

  // Ensure the video player reference is present before trying to play
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.load()
    videoPlayer.value.play()
  }
}

const previousVideo = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  } else if (currentSectionIndex.value > 0) {
    currentSectionIndex.value -= 1
    currentIndex.value = sections[currentSectionIndex.value].module_topic.length - 1
  }

  // Ensure the video player reference is present before trying to play
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.load()
    videoPlayer.value.play()
  }
}

const handleVideoEnd = () => {
  if (
    currentIndex.value < sections[currentSectionIndex.value].module_topic.length - 1 ||
    currentSectionIndex.value < sections.length - 1
  ) {
    setTimeout(() => nextVideo(), 1000) // Optional auto-play next video after 1 second
  }
}

const toggleSection = (sectionIndex) => {
  sections[sectionIndex].expanded = !sections[sectionIndex].expanded
}

const isLastVideo = computed(() => {
  return (
    currentSectionIndex.value === sections.length - 1 &&
    currentIndex.value === sections[currentSectionIndex.value].module_topic.length - 1
  )
})
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}
.video-container video,
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
button:disabled {
  cursor: not-allowed;
}
.video-info {
  margin-top: 16px;
}
.video-info span {
  display: block;
}
</style>
