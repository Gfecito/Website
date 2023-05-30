<template>
    <div class="bg-green-800 w-screen h-screen">
        <p>{{ data }}</p>
        <PersonalBooks></PersonalBooks>
        <PersonalInspiration></PersonalInspiration>
        <PersonalJourney></PersonalJourney>
        <PersonalMovies></PersonalMovies>
        <PersonalThanks></PersonalThanks>
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
  