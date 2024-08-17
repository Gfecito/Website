<template>
  <div class="py-10 px-20 mx-20">
    <h2 class="text-2xl font-bold">Welcome! 👋</h2>
    <div class="journey space-y-4">
      <p v-for="(one_liner, index) in parsedOneLiners" :key="index">
        <span v-html="one_liner"></span>
      </p>
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
    parsedOneLiners() {
      return this.data.one_liners.map((one_liner) => {
        return one_liner.replace(/\/h\s*(\w+)/g, (match, word) => {
          const letters = word
            .split("")
            .map((letter) => `<span class="letter">${letter}</span>`)
            .join("");
          return `<span class="highlight">${letters}</span>`;
        });
      });
    },
  },
};
</script>

<style>
.journey {
  max-width: 80%;
  text-align: justify;
  margin: auto;
}

.text-2xl {
  padding-bottom: 50px;
}

.highlight {
  font-size: 1.1em;
  font-weight: bold;
  white-space: nowrap; /* Prevent line breaks within the word */
}
.letter {
  display: inline-block;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  transform-origin: center;
}

.letter:hover {
  transform: scale(1.4); /* Scale up slightly on hover */
  color: #999; /* Slightly lighten the color */
}
</style>
