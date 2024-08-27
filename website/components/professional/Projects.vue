<template>
  <div class="projects">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="cards">
      <TinyCard
        v-for="(project, index) in data.projects"
        :key="index"
        :image="project.image"
        :title="project.title"
        :isImageOnLeft="index % 2 === 0"
      >
        <div name="project_description">
          <p v-for="paragraph in project.description">{{ paragraph }}</p>
          <a
            v-if="project.link"
            :href="project.link"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ project.websiteLabel }}</a
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
  width: 100%;
  margin: auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

div[name="project_description"] {
  text-align: justify;
  font-size: 0.8em;
  max-width: 50em;
}

div[name="project_description"] p {
  font-weight: normal;
  padding: 0.2rem 0;
}

.project-link {
  color: #3b82f6;
  margin-top: 0.5rem;
  text-decoration: underline;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }

  div[name="project_description"] {
    text-align: left;
  }
}
</style>
