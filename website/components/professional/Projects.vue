<template>
  <div class="projects p-8">
    <h2 class="text-2xl font-bold">Projects</h2>
    <div class="cards">
      <TinyCard
        v-for="(title, index) in data.titles"
        :key="index"
        :image="data.images[index]"
        :title="title"
        :isImageOnLeft="index % 2 === 0"
      >
        <div name="project_description">
          <p>
            {{ data.descriptions[index] }}
          </p>
          <a
            v-if="data.links[index]"
            :href="data.links[index]"
            class="text-blue-500 mt-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >Visit Website</a
          >
        </div>
      </TinyCard>
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
      return (isPair) => (isPair ? "right" : "left");
    },
  },
};
</script>

<style scoped>
.projects {
  max-width: 80%;
  margin: auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

div[name="project_description"] {
  text-align: justify;
  font-size: 0.8em;
  max-width: 50em;
}
div[name="project_description"] p {
  font-weight: normal;
}
</style>
