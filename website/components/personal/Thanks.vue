<template>
    <div class="bg-green-500 p-4">
      <h2 class="text-2xl font-bold text-white">Personal Thanks</h2>
      <p class="text-white">{{ data }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS classes for component-specific styling */
  </style>
  