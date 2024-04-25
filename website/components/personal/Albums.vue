<template>
  <div id="albums" class="border-red-500 border-dashed border-8 p-4" style="z-index: -1; overflow: hidden;">
    <div>
      <ImageTrack :data="posters"/>
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
      this.mouseDownAt = e.clientY;
    },
    handleMouseUp() {
      this.mouseDownAt = 0;
      this.prevScrollPercentage = this.percentageSlid;
    },
    handleMouseMove(e) {
      if (this.mouseDownAt === 0) return;

      const mouseDelta = parseFloat(this.mouseDownAt) - e.clientY;
      const maxDelta = window.innerWidth / 2;

      const currentPercentageSlid = (mouseDelta / maxDelta) * 100;
      const previousPercentageSlid = this.prevScrollPercentage;
      this.percentageSlid = previousPercentageSlid + currentPercentageSlid;
      // Bounds
      if (this.percentageSlid < -10) this.percentageSlid = -10;
      if (this.percentageSlid > 280) this.percentageSlid = 280;

      const imageTrack = this.$el.querySelector("#image-track");

      imageTrack.animate({
        transform: `translate(0%, ${-this.percentageSlid}%)`
      },
        {
          duration: 1450,
          fill: "forwards",
          easing: "cubic-bezier(0.62, 0.7, 0.58, 1)"
        });

      const images = imageTrack.querySelectorAll("img");

      imageTrack2.animate({
        transform: `translate(0%, ${-this.percentageSlid}%)`
      },
        {
          duration: 1450,
          fill: "forwards",
          easing: "cubic-bezier(0.62, 0.7, 0.58, 1)"
        });

      const images2 = imageTrack.querySelectorAll("img");

      let inversionPercentage = this.percentageSlid / 2.8;
      if (inversionPercentage<0) inversionPercentage = 0;

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
      images2.forEach((img) => {
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
  height: inherit;
  width: inherit;
  margin: 0rem;
  overflow: hidden;
}

.image-track {
  width: fit-content;
  height: inherit;
  display: flex;
  flex-direction: column;
  gap: 4vmin;
  /* position: fixed; */
  top: 0;
  overflow: hidden;
}

.image-track>img {
  width: 100%;
  margin: 0 auto;
  height: 220px;
  object-fit: cover;
  object-position: 100% 50%;
  filter: invert(0);
  user-select: none; /*Prevents ugly 'text selection' blue effect on drag*/
}

#image-track {
  left: 0%;
}


@media only screen and (min-width: 850px) {
  .image-track>img {
    width: min(95%, 300px);
    height: 330px;
  }
}
</style>
  