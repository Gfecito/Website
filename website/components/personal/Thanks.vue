<template>
  <div class="bg-green-500 p-4">
    <h2 class="text-2xl font-bold text-white">Personal Thanks</h2>
    <div class="mt-4">
      <ul class="list-disc list-inside text-white">
        <li v-for="thank in thanks" :key="thank" class="mb-2">{{ thank }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    thanks() {
      return this.data;
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes for component-specific styling */
</style>
