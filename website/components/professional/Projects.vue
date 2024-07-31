<template>
  <div class="projects p-8">
    <h2 class="text-2xl font-bold">Projects</h2>
    <Card
      v-for="(title, index) in data.titles"
      :key="index"
      :image="data.images[index]"
      :title="title"
      :link="data.links[index] || ''"
      :isImageOnLeft="index % 2 === 0"
    >
      <p :class="textAlignment(index % 2 === 0)" name="project_description">
        {{ data.descriptions[index] }}
      </p>
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
      return description
        .map(
          (contents) =>
            contents.replace(
              /<l(.*?)\s/g,
              '<a href="$1" target="_blank" rel="noopener noreferrer" '
            ) + "</a>"
        )
        .join("");
    },
  },
  computed: {
    textAlignment() {
      return (isPair) => (isPair ? "text-right" : "text-left");
    },
  },
};
</script>

<style scoped>
.projects {
  max-width: 80%;
  margin: auto;
}
</style>
