<template>
  <div>
    <Card
      v-for="(title, index) in data.titles"
      :key="index"
      :image="data.images[index]"
      :title="title"
      :link="data.links[index] || ''"
      :isImageOnLeft="index % 2 === 0"
    >
  <p class="project_description">{{ data.descriptions[index] }}</p>
  </Card>
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
  methods: {
    formatDescription(description) {
      return description.map((contents) =>
        contents.replace(/<l(.*?)\s/g, '<a href="$1" target="_blank" rel="noopener noreferrer" ') + '</a>'
      ).join('');
    },
  },
};
</script>
  
<style scoped>
/* Add any additional Tailwind CSS classes for component-specific styling */
</style>
  