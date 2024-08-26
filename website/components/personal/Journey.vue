<template>
  <div class="container">
    <h2 class="title">{{ this.data.title }}</h2>
    <div class="journey">
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
      return this.data.description.map((one_liner) => {
        return one_liner.replace(/\/h\s*([\S]+)/g, (match, word) => {
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
/* Replacing Tailwind with equivalent CSS */
.container {
  padding: 40px 80px; /* Equivalent to py-10 px-20 */
  margin: 40px auto; /* Equivalent to mx-20 */
}

.title {
  font-size: 1.5rem; /* Equivalent to text-2xl */
  font-weight: bold; /* Equivalent to font-bold */
  padding-bottom: 50px;
}

.journey {
  max-width: 80%;
  text-align: justify;
  margin: auto;
  margin-top: 20px; /* Adding space-y-4 equivalent */
}

.journey p {
  margin-bottom: 1rem;
}

.highlight {
  font-size: 1.1em;
  font-weight: bold;
  white-space: nowrap;
}

.letter {
  display: inline-block;
  transition: transform 2s ease-in-out, 0.1s ease-in-out;
  transform-origin: center;
}

.letter:hover {
  transform: scale(1.6);
  color: #999;
}

/* Mobile Styling */
@media only screen and (max-width: 768px) {
  .container {
    padding: 20px 40px; /* Smaller padding for mobile */
    margin: 20px auto; /* Smaller margin for mobile */
  }

  .title {
    font-size: 1.25rem; /* Slightly smaller font size for mobile */
    padding-bottom: 30px;
  }

  .journey {
    max-width: 90%; /* Slightly wider on mobile for better fit */
    margin-top: 15px;
    text-align: left;
  }
}
</style>
