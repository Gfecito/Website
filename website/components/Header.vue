<template>
    <div class="fixed 
        top-0 
        w-full 
        bg-gray-800 
        text-white flex 
        items-center 
        justify-between 
        py-4 
        px-6 
        z-50">
        <div class="flex items-center">
            <img src="" alt="darkmode" class="mr-4">
            <HamburgerMenu 
            :languages="['French', 'English', 'Spanish']" 
            :use-button="false"
            @language-change="languageChange"
            @header-height="handleHeaderHeight" />
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
        setActivePage(page) {
            this.$emit("page-change", page);
        },
        languageChange(language) {
            console.log(`On header: ${language}`);
            switch (language) {
                case "English":
                    language = "en";
                    break;
                case "Spanish":
                    language = "es";
                    break;
                case "French":
                    language = "fr";
                    break;
                default:
                    console.log(`Error; human language selected by user ${language.value} not recognized, couldn't abreviate.`);
            }
            this.$emit("language-change", language);
        }
    },
    mounted() {
        // Emit custom event after the component is mounted
        this.$nextTick(() => {
            this.$emit("header-height", this.$el.offsetHeight);
        });
    }
};
</script>
  
  
<style scoped>
/* Add tailwind classes and custom styles if needed */
</style>
  