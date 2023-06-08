<template>
    <div class="bg-red-500 p-4">
      <h2 class="text-2xl font-bold text-white">Professional Accolades</h2>
      <div class="text-white mt-4">
        <ul>
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
  