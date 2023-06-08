<template>
    <div class="bg-red-800 p-4">
      <h2 class="text-2xl font-bold text-white">Professional Projects</h2>
      <div class="mt-4">
        <ul class="space-y-4">
          <li v-for="(title, index) in data.titles" :key="index">
            <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
            <div class="text-white">
              <p v-html="formatDescription(data.descriptions[index])"></p>
            </div>
            <img :src="data.images[index]" alt="Project Image" class="w-24 h-24 mt-4">
          </li>
        </ul>
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
    methods: {
      formatDescription(description) {
        return description.map((paragraph) =>
          paragraph.replace(/<l(.*?)\s/g, '<a href="$1" target="_blank" rel="noopener noreferrer" ')
        );
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional Tailwind CSS classes for component-specific styling */
  </style>
  