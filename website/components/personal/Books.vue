<template>
  <div id="library" class="bg-purple-500 p-4">
    <h2 class="text-2xl font-bold text-white">Personal Books</h2>
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
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    shelves() {
      const shelves = [];
      const books = this.data;

      for (let i = 0; i < Math.ceil(books.length / 5); i++) {
        const shelf = books.slice(i * 5, (i + 1) * 5);
        shelves.push(shelf);
      }
      console.log(shelves);
      return shelves;
    },
  },
  methods: {
    getBookRowStyle(shelf) {
      const padding = (5 - shelf.length) * 10;
      return {
        gridTemplateColumns: `repeat(${shelf.length}, min(20%, 180px))`,
        gridTemplateRows: '0',
        paddingLeft: `${padding}%`,
      };
    },
    getBookStyle(book) {
      return {
        backgroundImage: `url(${book})`,
      };
    },
  },
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
  width: min(100%, 900px);
  background-color: #FFF;
  box-shadow: 10px 10px 6px rgb(180, 179, 179);
}

@media only screen and (min-width: 850px) {
  .book {
    width: min(95%, 160px);
    height: 220px;
  }

  .book-shelf {
    grid-template-rows: 220fr 25fr;
  }
}

</style>
