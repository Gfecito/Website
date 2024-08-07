<template>
  <div
    :class="[
      'card mx-auto bg-white bg-opacity-40 shadow-lg rounded-lg overflow-hidden flex mb-5',
    ]"
  >
    <div class="img-container flex-shrink-0">
      <img :src="image" :alt="title" :class="['object-cover']" />
    </div>
    <div :class="['p-4 mr-8 w-full']">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <div class="mt-2">
        <slot></slot>
      </div>
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
    isImageOnLeft: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 200px; /* Set the fixed height */
  overflow: hidden; /* Hide the overflow */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire container, cropping if necessary */
}

.card {
  margin: 40px;
  max-width: 100%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}
</style>
