<template>
    <div class="fixed 
        top-0 
        w-full 
        bg-gray-800 
        text-white flex 
        items-center 
        justify-between 
        py-4 
        px-6">
        <div class="flex items-center">
            <img src="" alt="darkmode" class="mr-4">
            <HamburgerMenu :languages="['French', 'English', 'Español']" 
            @language-change=" language = $event" 
            @header-height="handleHeaderHeight" />
        </div>
        <div class="flex items-center">
            <nuxt-link to="#" class="mr-4" @click="setActivePage('Me')">Me</nuxt-link>
            <nuxt-link to="#" class="mr-4" @click="setActivePage('Work')">Work</nuxt-link>
            <nuxt-link to="#" class="mr-4" @click="setActivePage('Vlog')">Vlog</nuxt-link>
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        setActivePage(page) {
            this.$emit("page-change", page);
        },
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
  