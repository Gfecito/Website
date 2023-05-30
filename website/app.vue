<script setup>
  import data from '~/data/content.json';
  
  const language = "es";
  let translated_data;
  switch(language){
    case "en":
      translated_data = data.en;
      break;
    case "es":
      translated_data = data.es;
      break;
    case "fr":
      translated_data = data.fr;
      break;
    default:
      console.log("Error; human language selected by user not recognized")
  }
  let activePage = false;
</script>

<template>
  <Header></Header>
  <Personal v-if="activePage"></Personal>
  <Professional v-else></Professional>
  {{ translated_data }}
  <Footer></Footer>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style>
