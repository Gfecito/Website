<template>
  <div :class="[cardSideClass, 'max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex']">
    <div class="flex-shrink-0 w-1/2">
      <img :src="image" :alt="title" class="object-cover h-full w-full">
    </div>
    <div class="p-4 w-1/2">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <p class="mt-2">{{ paragraph }}</p>
      <a v-if="link" :href="link" class="text-blue-500 mt-2 hover:underline" target="_blank" rel="noopener noreferrer">Visit Website</a>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    isImageOnLeft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardSideClass() {
      return this.isImageOnLeft ? 'flex-row' : 'flex-row-reverse';
    },
  },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes for component-specific styling */
</style>
  