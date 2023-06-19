<template>
  <div class="border-green-500 border-dashed border-8 p-4">
    <h2 class="text-2xl font-bold">Personal Thanks</h2>
    <div class="mt-4">
      <ul class="list-disc list-inside">
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
