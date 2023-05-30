<template>
    <div class="bg-blue-800 w-screen h-screen">
        <p>{{ data }}</p>
        <ProfessionalWork></ProfessionalWork>
        <ProfessionalEducation></ProfessionalEducation>
        <ProfessionalPrices></ProfessionalPrices>
        <ProfessionalInterests></ProfessionalInterests>
        <ProfessionalProjects></ProfessionalProjects>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true,
    },
  },
};
</script>
  
<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  