<template>
    <div class="border-green-800 min-h-screen">
      <PersonalJourney :data="journeyData"></PersonalJourney>
      <div style="display: grid; grid-template-columns: 1fr 5fr 1fr; grid-gap: 5%; width: 100%; height: 1100px;">
        <PersonalMovies :data="moviesData"></PersonalMovies>
        <PersonalBooks :books="booksData"/>
        <PersonalAlbums :data="albumsData"></PersonalAlbums>
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
  data() {
    return {
      journeyData: null,
      booksData: null,
      moviesData: null,
      albumsData: null,
    };
  },
  created() {
    this.journeyData = this.data.journey;
    this.booksData = this.data.books;
    this.moviesData = this.data.movies;
    this.albumsData = this.data.albums;
  }
};
</script>

<style scoped>

</style>
  