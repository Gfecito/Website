<template>
    <div class="background-layer" :style="{ opacity: backgroundOpacity }"></div>
    <div class="border-green-800 min-h-screen">
      <PersonalJourney :data="journeyData"></PersonalJourney>
      <div style="display: grid; grid-template-columns: 1fr 5fr 1fr; width: 100%; height: 800px;">
        <PersonalMovies :data="moviesData"></PersonalMovies>
        <PersonalBooks :books="booksData" :movies="moviesData"/>
        <PersonalAlbums :data="moviesData"></PersonalAlbums>
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
    };
  },
  created() {
    this.journeyData = this.data.journey;
    this.booksData = this.data.books;
    this.moviesData = this.data.movies;
  },
  setup() {
      let backgroundOpacity = ref(0);

      // Easing function for smoother animation
      const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      // Update scrollPosition and backgroundOpacity on scroll using requestAnimationFrame
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        const scrollPositionY = window.scrollY;
        const maxOpacityScroll = scrollHeight - windowHeight; // Bottom of the page

        // Calculate opacity based on scroll position using easing function
        backgroundOpacity.value = easeInOutQuad(Math.min(scrollPositionY / maxOpacityScroll, 1));

        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            const parallaxFactor = 0.05; // Adjust this value for desired parallax effect strength
            const backgroundOffsetY = scrollPositionY * parallaxFactor;
            document.querySelector('.background-layer').style.transform = `translateY(-${backgroundOffsetY}px)`;
        });
      };

      // Add debounced scroll event listener on component mount
      onMounted(() => {
          window.addEventListener('scroll', handleScroll);
      });

    return {
        backgroundOpacity
    };
  }
};
</script>

<style scoped>
.background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('images/fractals/julia_fractal_white.jpeg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}
</style>
  