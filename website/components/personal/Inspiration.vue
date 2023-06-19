<template>
  <div class="border-yellow-500 border-dashed border-8 p-4">
    <h2 class="text-2xl font-bold">Personal Inspiration</h2>
    <div>
      <div v-for="(person, index) in people" :key="person.name" class="my-4">
        <Card 
          :image="person.image" 
          :alt="person.name" 
          :title="person.name" 
          :paragraph="person.description"
          :isImageOnLeft="index % 2 === 0"></Card>
      </div>
    </div>
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
    people() {
      return this.data.people;
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes for component-specific styling */
</style>
