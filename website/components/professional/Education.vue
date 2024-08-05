<template>
  <div class="education p-8">
    <h2 class="text-2xl font-bold">Education</h2>
    <Card
      v-for="(institution, index) in institutions"
      :key="institution.name"
      :image="institution.image"
      :title="institution.name"
      :isImageOnLeft="index % 2 === 0"
    >
      <p class="institution_details">{{ institution.details }}</p>
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
      <p class="py-2 institution_description">{{ institution.description }}</p>
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
};
</script>

<style scoped>
.education {
  max-width: 80%;
  margin: auto;
}

.course {
  font-weight: normal;
  font-size: 0.8em;
}

.institution_details {
}

.institution_description {
  font-weight: normal;
  font-size: 0.6em;
  text-align: justify;
  padding-left: 2em;
  padding-right: 2em;
}

h3 {
  padding-top: 20px;
  font-weight: bold;
  font-size: 0.6em;
}
</style>
