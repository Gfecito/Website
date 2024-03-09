<template>
  <div id="library" class="border-purple-500 border-dashed border-8 py-4 px-20 mx-20">
    <h2 class="text-2xl font-bold">Some Books I Like!</h2>
    <div class="book-shelves">
      <div v-for="(shelf, index) in shelves" :key="index" class="book-shelf">
        <div class="book-row" :style="getBookRowStyle(shelf)">
          <div v-for="(book, bookIndex) in shelf" :key="bookIndex" class="book" :style="getBookStyle(book)"></div>
        </div>
        <div class="shelf"></div>
      </div>
    </div>
  </div>
  <div id="movies" class="border-red-500 border-dashed border-8 p-4" style="z-index: -1; overflow: hidden;">
    <div style="grid-template-columns: 1fr 1fr;">
      <div ref="image_track_1" id="image-track-1" class="image-track">
        <img v-for="poster in posters" :src="poster" draggable="false" alt="movie poster">
      </div>
      <div ref="image_track_2" id="image-track-2" class="image-track">
        <img v-for="poster in posters" :src="poster" draggable="false" alt="movie poster">
      </div>
    </div>
  </div>
</template>

<script>
const BOOKS_PER_SHELF = 7
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
    movies: {
      type: Object,
      required: true,
    }
  },
  computed: {
    shelves() {
      const shelves = [];
      const books = this.books;

      for (let i = 0; i < Math.ceil(books.length / BOOKS_PER_SHELF); i++) {
        const shelf = books.slice(i * BOOKS_PER_SHELF, (i + 1) * BOOKS_PER_SHELF);
        shelves.push(shelf);
      }
      return shelves;
    },
    posters(props) {
      return props.movies.posters;
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
    getBookRowStyle(shelf) {
      const padding = (BOOKS_PER_SHELF - shelf.length) * 10;
      return {
        gridTemplateColumns: `repeat(${shelf.length}, min(${parseInt(100/BOOKS_PER_SHELF)}%, ${parseInt(900/BOOKS_PER_SHELF)}px))`,
        gridTemplateRows: '0',
        paddingLeft: `${padding}%`,
      };
    },
    getBookStyle(book) {
      return {
        backgroundImage: `url(${book})`,
      };
    },
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

      const imageTrack = this.$refs.image_track_1;
      const imageTrack2 = this.$refs.image_track_2;

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
#library{
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.book-shelf {
  display: grid;
  margin: 0 auto 15px 0;
  grid-template-rows: 110fr 25fr;
}

.book-row {
  display: grid;
  justify-content: center;
}

.book {
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  width: min(95%, 80px);
  background-size: cover;
  margin: 0 auto;
  height: 110px;
}

.shelf {
  margin: 0 auto;
  height: 25px;
  width: min(100%, 1200px);
  background-color: #FFF;
  box-shadow: 10px 10px 6px rgb(180, 179, 179);
}

@media only screen and (min-width: 850px) {
  .book {
    width: min(95%, 100px);
    height: 160px;
  }

  .book-shelf {
    grid-template-rows: 160fr 25fr;
  }
}


#movies {
  height: 100vh;
  width: 100vw;
  margin: 0rem;
  overflow: hidden;
}

.image-track {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 4vmin;
  position: relative; /* Using absolute breaks layout */
  top: 0;
  overflow: hidden;
}

.image-track>img {
  width: min(95%, 200px);
  margin: 0 auto;
  height: 220px;
  object-fit: cover;
  object-position: 100% 50%;
  filter: invert(0);
  user-select: none; /*Prevents ugly 'text selection' blue effect on drag*/
}

#image-track-1 {
  left: 0%;
}

#image-track-2 {
  margin-left: 80%;
}


@media only screen and (min-width: 850px) {
  .image-track>img {
    width: min(95%, 300px);
    height: 330px;
  }
}
</style>
  