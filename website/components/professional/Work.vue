<template>
    <div class="bg-red-500 p-4">
      <h2 class="text-2xl font-bold text-white">Professional Work</h2>
      <div class="mt-4">
        <div v-for="(description, index) in data.descriptions" :key="index" class="mb-4">
          <h3 class="text-xl font-bold text-white">{{ data.titles[index] }}</h3>
          <img :src="data.images[index]" alt="Work Image" class="my-2 rounded-lg w-64 h-64 object-cover">
          <p class="text-white">{{ description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS classes for component-specific styling */
  </style>
  