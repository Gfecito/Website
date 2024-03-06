<template>
    <div class="border-green-800 min-h-screen">
      <PersonalJourney :data="journeyData"></PersonalJourney>
      <PersonalBooks :data="booksData"></PersonalBooks>
      <PersonalMovies :data="moviesData"></PersonalMovies>
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
    };
  },
  created() {
    this.journeyData = this.data.journey;
    this.booksData = this.data.books;
    this.moviesData = this.data.movies;
  },
};
</script>

<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  