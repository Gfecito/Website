<template>
  <div :class="[cardSideClass, 'mx-auto bg-white bg-opacity-40 shadow-lg rounded-lg overflow-hidden flex h-80 mb-5']">
    <div class="flex-shrink-0">
      <img :src="image" :alt="title" :class="[imageSideClass, 'object-cover h-full']">
    </div>
    <div :class="[contentSideClass, 'p-4 mr-8 w-full']">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <div class="mt-2">
        <slot></slot>
      </div>
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
    contents: {
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
    imageSideClass() {
      return this.isImageOnLeft ? 'float-right' : 'float-left';
    },
    contentSideClass() {
      return this.isImageOnLeft ? 'float-left' : 'float-right';
    },
  },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes for component-specific styling */
</style>
  