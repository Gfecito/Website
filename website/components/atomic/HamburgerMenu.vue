<template>
  <div class="relative mx-10">
    <div
      class="h-6 w-6 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      @click="toggleDropdown"
    >
      <img src="public/images/world_icon.png" alt="" />
    </div>
    <div
      class="absolute bg-gray-800 right-0 w-36 mt-2 py-2 rounded-lg shadow-lg"
      v-show="dropdownOpen"
    >
      <div>
        <div v-if="useButton">
          <button
            v-for="language in languages"
            :key="language"
            @click="languageChange(language)"
            class="px-4 py-2 hover:bg-gray-400 cursor-pointer"
          >
            {{ language.toUpperCase() }}
          </button>
        </div>
        <div v-else>
          <NuxtLink
            v-for="language in languages"
            :key="language"
            :to="`/${language}`"
            class="px-4 py-2 hover:bg-gray-200 cursor-pointer block"
          >
            {{ language.toUpperCase() }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    languages: {
      type: Array,
      required: true,
    },
    useButton: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    languageChange(language) {
      console.log(`On hamburguer: ${language}`);
      this.$emit("language-change", language);
    },
  },
};
</script>

<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
