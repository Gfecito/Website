<template>
    <div class="bg-blue-500 p-4">
        <div v-for="institution in institutions" :key="institution.title">
            <h2 class="text-2xl font-bold text-white">{{ institution.title }}</h2>
            <div class="flex items-center mb-4">
                <img :src="institution.image" alt="Institution Logo" class="w-8 h-8 mr-2">
                <p class="text-white">{{ institution.degree }}</p>
            </div>
            <p class="text-white" v-for="description in institution.descriptions" :key="description">{{ description }}</p>
            <p class="text-white">{{ institution.details }}</p>
        </div>
        <h2 class="text-2xl font-bold text-white">Classes</h2>
        <ul class="text-white">
            <li v-for="classItem in classes" :key="classItem">{{ classItem }}</li>
        </ul>
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
        institutions() {
            return this.data.titles.map((title, index) => {
                return {
                    title,
                    image: this.data.images[index],
                    degree: this.data.degrees[index],
                    descriptions: this.data.descriptions[index],
                    details: this.data.details[index],
                };
            });
        },
        classes() {
            return this.data.classes;
        },
    },
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes for component-specific styling */
</style>
  