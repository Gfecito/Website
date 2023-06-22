<template>
    <div class="relative">
        <div class="h-6 w-6 bg-white rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center"
            @click="toggleDropdown">
            <span class="sr-only">Hamburger Menu</span>
            <span class="block w-4 h-0.5 bg-gray-800 mb-1 transform rotate-45"></span>
            <span class="block w-4 h-0.5 bg-gray-800 mb-1 transform -rotate-45"></span>
            <span class="block w-4 h-0.5 bg-gray-800"></span>
        </div>
        <div class="absolute right-0 w-36 bg-white mt-2 py-2 rounded-lg shadow-lg" v-show="dropdownOpen">
            <button v-for="language in languages" :key="language" @click="setLanguage('fr')"
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer">{{
                    language }}</button>
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
        setLanguage(language) {
            this.$emit("language-change", language);
        }
    },
};
</script>
  
<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  