<template>
    <div class="p-8">
      <h2 class="text-2xl font-bold">Education</h2>
        <Card v-for="(institution, index) in institutions" 
        :key="institution.title" 
        :image="institution.image"
        :title="institution.title" 
        :isImageOnLeft="index % 2 === 0">
        <p class="institution_details">{{ institution.details }}</p>
    </Card>
        <h2 class="text-2xl font-bold">Classes</h2>
        <ul style="display: grid; grid-template-columns: repeat(4, 1fr);">
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
  