<template>
  <div id="movies" class="bg-red-500 p-4">
    <h2 class="text-2xl font-bold text-white">Personal Movies</h2>
    <div id="image-track" data-mouse-down-at="0" data-prev-scroll-percentage="0">
      <img v-for="poster in posters" :src="poster" draggable="false" alt="movie poster">
    </div>
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
  computed: {
    posters(props) {
      return props.data.posters;
    },
  },
  data() {
    return {
      mouseDownAt: "0",
      prevScrollPercentage: "0",
      percentageSlid: 0,
    };
  },
  mounted() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleMouseDown(e) {
      this.mouseDownAt = e.clientX;
    },
    handleMouseUp() {
      this.mouseDownAt = "0";
      this.prevScrollPercentage = this.percentageSlid;
    },
    handleMouseMove(e) {
      if (this.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(this.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const currentPercentageSlid = (mouseDelta / maxDelta) * 100;
      const previousPercentageSlid = parseFloat(this.prevScrollPercentage);
      this.percentageSlid = previousPercentageSlid + currentPercentageSlid;
      // Bounds
      if(this.percentageSlid<-10) this.percentageSlid = -10;
      if(this.percentageSlid>110) this.percentageSlid = 110;

      this.$el.querySelector("#image-track").style.transform = `translate(${-this.percentageSlid}%, -50%)`;
      for(const image of this.$el.querySelector("img")){
        image.style.objectPosition = `${nextPercentage} 50%`;
      }
    },
  },
};
</script>
  
<style scoped>
#movies {
  height: 100vh;
  width: 100vw;
  background-color: black;
  margin: 0rem;
  overflow: hidden;
}

#image-track>img {
  width: min(95%, 200px);
  margin: 0 auto;
  height: 220px;
  object-fit: cover;
  object-position: 100% 50%;
}

#image-track {
  display: flex;
  gap: 4vmin;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
}


@media only screen and (min-width: 850px) {
  #image-track>img {
    width: min(95%, 400px);
    height: 440px;
  }
}
</style>
  