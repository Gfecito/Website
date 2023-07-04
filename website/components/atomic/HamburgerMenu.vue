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
                <div>
                    <div v-if="useButton">
                        <button v-for="language in languages" :key="language" @click="languageChange(language)"
                            class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            {{ language.toUpperCase() }}
                        </button>
                    </div>
                    <div v-else>
                        <NuxtLink v-for="language in languages" :key="language" :to="`/${language}`"
                            class="px-4 py-2 hover:bg-gray-200 cursor-pointer block">
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
        useButton:{
            type: Boolean,
            required: true,
        }
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
        }
    },
};
</script>
  
<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  