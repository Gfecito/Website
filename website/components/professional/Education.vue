<template>
  <div class="education p-8">
    <h2 class="text-2xl font-bold">Education</h2>
    <Card
      v-for="(institution, index) in institutions"
      class="vertical_card"
      :key="index"
    >
      <template v-slot:first>
        <div :class="[cardSideClass(index), 'top_grid']">
          <div class="image_container flex-shrink-0">
            <img
              :src="institution.image"
              :alt="institution.name"
              class="object-cover w-full"
            />
          </div>
          <div class="institution_header">
            <h1>{{ institution.name }}</h1>
            <p class="institution_details">{{ institution.details }}</p>
          </div>
        </div>
      </template>
      <template v-slot:second>
        <div class="p-4 mr-8 w-full">
          <div class="institution_body">
            <h3>Some classes I liked:</h3>
            <ul style="display: grid; grid-template-columns: repeat(3, 1fr)">
              <li
                v-for="classItem in institution.classes"
                class="course py-1"
                :key="classItem"
              >
                {{ classItem }}
              </li>
            </ul>
            <p class="py-2 institution_description">
              {{ institution.description }}
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
.vertical_card {
  display: flex;
  flex-direction: column;
}

.education {
  max-width: 80%;
  margin: auto;
}

.course {
  font-weight: normal;
  font-size: 1em;
}

.institution_details {
}

.institution_description {
  font-weight: normal;
  font-size: 0.8em;
  text-align: justify;
  padding-left: 2em;
  padding-right: 2em;
}

h1 {
  text-align: center;
}

h3 {
  padding-top: 20px;
  font-weight: bold;
  font-size: 1.2em;
}

.image_container {
  width: 50%;
  max-height: 100%;
}

.top_grid {
  display: flex;
  gap: 20px;
}

.institution_header {
  margin: auto;
}

.institution_body {
}
</style>
