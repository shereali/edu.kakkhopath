<template>
  <div class="w-full bg-gray-200 rounded">
    <div :style="{ width: progress + '%' }" class="h-2 bg-green-500 rounded"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
