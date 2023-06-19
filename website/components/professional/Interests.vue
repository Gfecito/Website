<template>
    <div class="border-red-500 border-dashed border-8 p-4">
      <h2 class="text-2xl font-bold">Professional Interests</h2>
      <div class="mt-4 space-y-8">
        <Card
          v-for="(title, index) in data.titles"
          :key="index"
          :image="data.images[index]"
          :title="title"
          :paragraph="data.descriptions[index].join(' ')"
          :isImageOnLeft="index % 2 === 0"
        ></Card>
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
  