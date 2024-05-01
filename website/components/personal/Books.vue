<template>
  <div id="library" class="py-4">
    <div class="book-shelves">
      <div v-for="(shelf, index) in shelves" :key="index" class="book-shelf">
        <div class="book-row" :style="getBookRowStyle(shelf)">
          <div v-for="(book, bookIndex) in shelf" :key="bookIndex" class="book" :style="getBookStyle(book)"></div>
        </div>
        <div class="shelf"></div>
      </div>
    </div>
  </div>
</template>

<script>
const BOOKS_PER_SHELF = 4
export default {
  props: {
    books: {
      type: Array,
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
  },
  data() {
    return {
      mouseDownAt: 0,
      prevScrollPercentage: 0,
      percentageSlid: 0,
    };
  },
  methods: {
    getBookRowStyle(shelf) {
      const padding = (BOOKS_PER_SHELF - shelf.length) * 10;
      return {
        gridTemplateColumns: `repeat(${shelf.length}, min(${parseInt(100/BOOKS_PER_SHELF)}%, ${parseInt(900/BOOKS_PER_SHELF)}px))`,
        gridTemplateRows: '0',
        // gridGap: '15px',
        paddingLeft: `${padding}%`,
      };
    },
    getBookStyle(book) {
      return {
        backgroundImage: `url(${book})`,
      };
    },
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
  width: min(95%, 160px);
  background-size: cover;
  margin: 0 auto;
  height: 110px;
}

.shelf {
  margin: 0 auto;
  height: 25px;
  width: 100%;
  background-color: #FFF;
  box-shadow: 10px 10px 6px rgb(180, 179, 179);
}

@media only screen and (min-width: 850px) {
  .book {
    height: 140px;
    width: 110px;
  }

  .book-shelf {
    grid-template-rows: 140px 25px;
  }
}
</style>
  