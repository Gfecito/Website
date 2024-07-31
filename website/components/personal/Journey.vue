<template>
  <div class="py-10 px-20 mx-20">
    <h2 class="text-2xl font-bold">Welcome! 👋</h2>
    <div class="journey space-y-4">
      <p v-for="(one_liner, index) in data.one_liners" :key="one_liner">
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
.journey {
  max-width: 80%;
  text-align: justify;
  margin: auto;
}

.text-2xl {
  padding-bottom: 50px;
}
</style>
