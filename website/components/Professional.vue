<template>
  <div class="content-container">
    <ProfessionalWork :data="workData"></ProfessionalWork>
    <ProfessionalEducation :data="educationData"></ProfessionalEducation>
    <ProfessionalPrices :data="awardData"></ProfessionalPrices>
    <ProfessionalProjects :data="projectData"></ProfessionalProjects>
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
  data() {
    return {
      workData: null,
      educationData: null,
      awardData: null,
      projectData: null,
      interestData: null,
    };
  },
  created() {
    this.workData = this.data.work;
    this.educationData = this.data.education;
    this.awardData = this.data.awards;
    this.projectData = this.data.projects;
    this.interestData = this.data.interests;
  },
};
</script>

<style scoped>
.content-container {
  min-height: 100vh;
  padding: 0 2.5rem; /* Equivalent to Tailwind's `px-10` */
}

/* Mobile styles */
@media (max-width: 600px) {
  .content-container {
    padding: 0 1rem; /* Reduced padding for mobile */
  }
}
</style>
