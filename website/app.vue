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
  let activePage = true;

  let personalData = translated_data["personal"];

  let professionalData = {};
  professionalData["school"] = translated_data["school"];
  professionalData["work"] = translated_data["work"];
  professionalData["projects"] = translated_data["projects"];
  professionalData["interests"] = translated_data["interests"];
  professionalData["awards"] = translated_data["awards"];
</script>

<template>
  <Header></Header>
  <Personal :data="personalData" v-if="activePage" ></Personal>
  <Professional :data="professionalData" v-else></Professional>
  <Footer></Footer>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style>
