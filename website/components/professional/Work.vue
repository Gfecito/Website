<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold">Professional Work</h2>
      <div class="mt-4">
        <Card v-for="(description, index) in data.descriptions"
          :key="index"
          :image="data.images[index]"
          :title="data.titles[index]"
          :isImageOnLeft="index % 2 === 0"
        >
      <p>{{description.split("--")[0]}}</p>
      <ul class="mt-4">
        <li class="pt-4" v-for="(item, index) in description.split('--')" :key="index">{{ item }}</li>
      </ul>
      </Card>
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
  