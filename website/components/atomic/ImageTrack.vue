<template>
  <div id="image-track" class="image-track">
    <img v-for="image in images" :src="image" draggable="false" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  computed: {
    images(props) {
      return props.data;
    },
    id(props) {
      return `${props.title}-image-track`;
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
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    handleMouseDown(e) {
      const componentRect = this.$el.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        mouseX >= componentRect.left &&
        mouseX <= componentRect.right &&
        mouseY >= componentRect.top &&
        mouseY <= componentRect.bottom
      ) {
        this.mouseDownAt = mouseY;
      }
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
      if (this.percentageSlid > 80) this.percentageSlid = 80;

      const imageTrack = this.$el;

      imageTrack.animate(
        {
          transform: `translate(0%, ${-this.percentageSlid}%)`,
        },
        {
          duration: 1450,
          fill: "forwards",
          easing: "cubic-bezier(0.62, 0.7, 0.58, 1)",
        }
      );

      const images = imageTrack.querySelectorAll("img");

      let inversionPercentage = this.percentageSlid / 2.8;
      if (inversionPercentage < 0) inversionPercentage = 0;

      // Avoid ugly middle interval; and make it snappy.
      if (inversionPercentage > 20 && inversionPercentage < 50) {
        inversionPercentage = 20;
      } else if (inversionPercentage > 50 && inversionPercentage < 80) {
        inversionPercentage = 80;
      }

      // Apply the color inversion animation to each image
      images.forEach((img) => {
        img.animate([{ filter: `invert(${inversionPercentage}%)` }], {
          duration: 850,
          fill: "forwards",
          easing: "cubic-bezier(0.62, 0.7, 0.58, 1)",
        });
      });
    },
  },
};
</script>

<style scoped>
.image-track {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4vmin;
  top: 0;
  overflow: hidden;
}

.image-track > img {
  width: 100%;
  margin: 0 auto;
  object-fit: cover;
  object-position: 100% 50%;
  filter: invert(0);
  user-select: none; /*Prevents ugly 'text selection' blue effect on drag*/
}
</style>
