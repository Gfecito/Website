<template>
  <div class="relative mx-10" ref="dropdownWrapper">
    <div
      class="icon cursor-pointer hover:bg-pink-600 flex items-center justify-center"
      @click="toggleDropdown"
    >
      <img src="public/images/world_icon.png" alt="" />
    </div>
    <div
      class="dropdown absolute bg-gray-800 mt-2 rounded-b-lg shadow-lg"
      v-show="dropdownOpen"
    >
      <div>
        <div v-if="useButton">
          <button
            v-for="language in languages"
            :key="language"
            @click="languageChange(language)"
            class="px-4 py-2 w-full hover:bg-pink-600 cursor-pointer"
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
    handleClickOutside(event) {
      if (!this.$refs.dropdownWrapper.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.dropdown {
  right: -37.5px;
  width: fit-content;
}

div > :nth-child(3) {
  border-bottom-right-radius: 0.5rem; /* 8px */
  border-bottom-left-radius: 0.5rem; /* 8px */
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
