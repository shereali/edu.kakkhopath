<template>
    <div v-if="loading" class="space-y-4 animate-pulse px-5 py-5">
        <div
            v-for="index in 3"
            :key="index"
            class="h-4 bg-gray-200 rounded w-full"
        ></div>
        <div class="h-6 bg-gray-200 rounded w-5/6 mt-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
});
</script>

<style scoped>
/* Optional: Customize styles if needed */
</style>
