<template>
  <div
    class="fixed top-0 w-full bg-gray-800 text-white flex items-center justify-between py-4 px-6 z-50"
  >
    <div class="flex items-center">
      <button @click="toggleDarkMode()" class="h-6 w-6">
        <img :src="theme_icon" alt="darkmode" class="mr-4" />
      </button>
      <HamburgerMenu
        :languages="['French', 'English', 'Spanish']"
        :use-button="true"
        @language-change="languageChange"
        @header-height="handleHeaderHeight"
      />
    </div>
    <div class="flex items-center">
      <button to="" class="mr-4" @click="setActivePage('Me')">Me</button>
      <button to="" class="mr-4" @click="setActivePage('Work')">Work</button>
      <button to="" class="mr-4" @click="setActivePage('Vlog')">Vlog</button>
    </div>
  </div>
</template>

<script>
export default {
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
/* Add tailwind classes and custom styles if needed */
</style>
