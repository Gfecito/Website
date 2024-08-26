<template>
  <div class="education">
    <h2 class="section-title">{{ data.title }}</h2>
    <Card
      v-for="(institution, index) in institutions"
      class="vertical_card"
      :key="index"
    >
      <template v-slot:first>
        <div :class="[cardSideClass(index), 'top_grid']">
          <div class="image_container">
            <img
              :src="institution.image"
              :alt="institution.name"
              class="object-cover"
            />
          </div>
          <div class="institution_header">
            <h1>{{ institution.name }}</h1>
            <p class="institution_details">{{ institution.details }}</p>
          </div>
        </div>
      </template>
      <template v-slot:second>
        <div class="content">
          <div class="institution_body">
            <h3>{{ data.classHeader }}</h3>
            <ul class="class-list">
              <li
                v-for="classItem in institution.classes"
                class="course"
                :key="classItem"
              >
                {{ classItem }}
              </li>
            </ul>
            <p
              class="institution_description"
              v-for="(desc, index) in institution.description"
              :key="index"
            >
              {{ desc }}
            </p>
          </div>
        </div>
      </template>
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
  computed: {
    institutions() {
      return this.data.schools;
    },
  },
  methods: {
    cardSideClass(index) {
      return this.isImageOnLeft(index) ? "flex-row" : "flex-row-reverse";
    },
    isImageOnLeft(index) {
      return index % 2 === 1; // Odd index -> image on left
    },
  },
};
</script>

<style scoped>
.education {
  max-width: 80%;
  margin: auto;
  padding: 2rem; /* Custom padding equivalent to Tailwind's `p-8` */
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.vertical_card {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.content {
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
}

.top_grid {
  display: flex;
  gap: 20px;
}

.image_container {
  width: 50%;
  max-height: 100%;
}

.institution_header {
  margin: auto;
}

h1 {
  text-align: center;
}

h3 {
  padding-top: 20px;
  font-weight: bold;
  font-size: 1.2em;
}

.course {
  font-weight: normal;
  font-size: 1em;
}

.class-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.institution_description {
  font-weight: normal;
  font-size: 0.8em;
  text-align: justify;
  padding: 0 2rem;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .education {
    max-width: 90%;
    padding: 0.5rem; /* Smaller padding for mobile */
  }

  .top_grid {
    flex-direction: column;
    gap: 10px;
  }

  .image_container {
    width: 100%;
  }

  .class-list {
    grid-template-columns: 1fr;
  }

  .institution_description {
    padding: 0 1rem; /* Reduce padding on mobile */
  }
}
</style>
