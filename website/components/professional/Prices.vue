<template>
    <div class="p-8">
      <h2 class="text-2xl font-bold">Awards</h2>
      <div class=" mt-4">
        <ul style="display: grid; grid-template-columns: repeat(4, 1fr);">
          <li v-for="(title, index) in data.titles" :key="index">
            <div class="flex items-center">
              <img src="~/assets/trophy.png" alt="Trophy" class="w-6 h-6 mr-2">
              <div>{{ title }}</div>
            </div>
            <div class="pl-8 mt-1 text-sm text-gray-300">
              <span class="font-semibold">Date: </span>{{ data.dates[index] }}
            </div>
            <div class="pl-8 mt-1 text-sm text-gray-300">
              <span class="font-semibold">Description: </span>{{ data.descriptions[index] }}
            </div>
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
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS classes for component-specific styling */
  </style>
  