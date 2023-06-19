<script setup>
  import data from '~/data/content.json';
  
  const language = "en";
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

  let personalData = translated_data["personal"];

  let professionalData = translated_data["professional"];
</script>

<template>
  <main>
    <Header></Header>
    <Personal :data="personalData" v-if="activePage" ></Personal>
    <Professional :data="professionalData" v-else></Professional>
    <Footer></Footer>
  </main>
</template>

<style>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
