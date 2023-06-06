<template>
    <div class="bg-green-800 w-screen h-screen">
      <PersonalJourney :data="journeyData"></PersonalJourney>
      <PersonalBooks :data="booksData"></PersonalBooks>
      <PersonalMovies :data="moviesData"></PersonalMovies>
      <PersonalInspiration :data="inspirationData"></PersonalInspiration>
      <PersonalThanks :data="thanksData"></PersonalThanks>
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
      journeyData: null,
      booksData: null,
      moviesData: null,
      inspirationData: null,
      thanksData: null,
    };
  },
  created() {
    this.journeyData = this.data.journey;
    this.booksData = this.data.books;
    this.moviesData = this.data.movies;
    this.inspirationData = this.data.inspiration;
    this.thanksData = this.data.thanks;
  },
};
</script>

<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  