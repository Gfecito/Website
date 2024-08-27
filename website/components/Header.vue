<template>
  <div
    class="fixed top-0 w-full bg-gray-800 text-white flex items-center justify-between py-4 px-6 z-50"
  >
    <div class="flex items-center">
      <button @click="toggleDarkMode()" class="icon hover:bg-pink-600">
        <img :src="theme_icon" alt="darkmode" />
      </button>
      <HamburgerMenu
        :languages="data.languages"
        :use-button="true"
        class="icon hover:bg-pink-600"
        @language-change="languageChange"
        @header-height="handleHeaderHeight"
      />
    </div>
    <div class="flex items-center">
      <button
        to=""
        class="mr-4 hover:text-pink-600"
        @click="setActivePage('me')"
      >
        {{ data.pages[0] }}
      </button>
      <button
        to=""
        class="mr-4 hover:text-pink-600"
        @click="setActivePage('work')"
      >
        {{ data.pages[1] }}
      </button>
      <button
        to=""
        class="mr-4 hover:text-pink-600"
        @click="setActivePage('blog')"
      >
        {{ data.pages[2] }}
      </button>
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
  methods: {
    toggleDarkMode() {
      let isDarkMode = !this.$parent.isDarkMode;

      this.$emit("theme-change", isDarkMode);
    },
    setActivePage(page) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.$emit("page-change", page);
    },
    languageChange(language) {
      console.log(`On header: ${language}`);
      this.$emit("language-change", language);
    },
  },
  mounted() {
    // Emit custom event after the component is mounted
    this.$nextTick(() => {
      this.$emit("header-height", this.$el.offsetHeight);
    });
  },
  computed: {
    theme_icon() {
      console.log(this.$parent.isDarkMode);
      return this.$parent.isDarkMode ? "images/moon.png" : "images/sun.png";
    },
  },
};
</script>

<style scoped>
button {
  font-size: 1rem;
}

img {
  margin: auto;
  width: 1.5rem;
  height: 1.5rem;
}

.icon {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
}
</style>
