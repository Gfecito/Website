<template>
    <div class="bg-red-500 p-4">
      <h2 class="text-2xl font-bold text-white">Professional Projects</h2>
      <div class="mt-4 space-y-8">
        <div v-for="(title, index) in data.titles" :key="index">
          <h3 class="text-xl font-bold text-white">{{ title }}</h3>
          <div v-for="(description, descIndex) in data.descriptions[index]" :key="descIndex">
            <p class="text-white">{{ description }}</p>
          </div>
          <img :src="data.images[index]" :alt="title" class="object-cover h-24 w-24">
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
    }
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS classes for component-specific styling */
  </style>
  