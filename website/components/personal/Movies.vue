<template>
  <div id="movies" class="border-red-500 border-dashed border-8 p-4">
    <h2 class="text-2xl font-bold">Personal Movies</h2>
    <div id="image-track">
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
      mouseDownAt: 0,
      prevScrollPercentage: 0,
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
      this.mouseDownAt = 0;
      this.prevScrollPercentage = this.percentageSlid;
    },
    handleMouseMove(e) {
      if (this.mouseDownAt === 0) return;

      const mouseDelta = parseFloat(this.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const currentPercentageSlid = (mouseDelta / maxDelta) * 100;
      const previousPercentageSlid = this.prevScrollPercentage;
      this.percentageSlid = previousPercentageSlid + currentPercentageSlid;
      // Bounds
      if (this.percentageSlid < -10) this.percentageSlid = -10;
      if (this.percentageSlid > 280) this.percentageSlid = 280;

      const imageTrack = this.$el.querySelector("#image-track");

      imageTrack.animate({
        transform: `translate(${-this.percentageSlid}%, -50%)`
      },
        {
          duration: 1450,
          fill: "forwards",
          easing: "cubic-bezier(0.62, 0.7, 0.58, 1)"
        });

      const images = imageTrack.querySelectorAll("img");

      let inversionPercentage = this.percentageSlid / 2.8;

      // Avoid ugly middle interval; and make it snappy.
      if (inversionPercentage > 20 && inversionPercentage < 50) {
        inversionPercentage = 20;
      }
      else if (inversionPercentage > 50 && inversionPercentage < 80) {
        inversionPercentage = 80;
      }

      // Apply the color inversion animation to each image
      images.forEach((img) => {
        img.animate(
          [
            { filter: `invert(${inversionPercentage}%)` }
          ],
          {
            duration: 850,
            fill: "forwards",
            easing: "cubic-bezier(0.62, 0.7, 0.58, 1)"
          }
        );
      });
    }
  }
};
</script>
  
<style scoped>
#movies {
  height: 100vh;
  width: 100vw;
  margin: 0rem;
  overflow: hidden;
}

#image-track>img {
  width: min(95%, 200px);
  margin: 0 auto;
  height: 220px;
  object-fit: cover;
  object-position: 100% 50%;
  filter: invert(0);
  user-select: none; /*Prevents ugly 'text selection' blue effect on drag*/
}

#image-track {
  width: fit-content;
  display: flex;
  gap: 4vmin;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
}


@media only screen and (min-width: 850px) {
  #image-track>img {
    width: min(95%, 300px);
    height: 330px;
  }
}
</style>
  