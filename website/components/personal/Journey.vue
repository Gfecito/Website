<template>
  <div class="bg-blue-500 p-4">
    <h2 class="text-2xl font-bold text-white">Personal Journey</h2>
    <div class="text-white space-y-4">
      <p v-for="(one_liner,index) in data.one_liners" :key="one_liner">
        <span class="font-bold">{{ one_liner }}</span>
        {{ data.paragraphs[index] }}
      </p>  
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
