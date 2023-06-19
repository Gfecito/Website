<template>
    <div class="border-blue-500 border-dashed border-8 p-4">
        <Card v-for="(institution, index) in institutions" 
        :key="institution.title" 
        :image="institution.image"
        :title="institution.title" 
        :paragraph="institution.details" 
        :isImageOnLeft="index % 2 === 0" />
        <h2 class="text-2xl font-bold">Classes</h2>
        <ul class="">
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
  