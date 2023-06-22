<script setup>
import data from '~/data/content.json';
import { ref, watch } from 'vue';

let language = ref("en");
let translated_data = data.en;
let personalData = translated_data["personal"];
let professionalData = translated_data["professional"];

watch(language, (newLanguage) => {
  switch (newLanguage.value) {
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
      console.log(`Error; human language selected by user ${newLanguage} not recognized`);
  }
  personalData = translated_data["personal"];
  professionalData = translated_data["professional"];
});

let activePage = ref('Me');
</script>


<template>
  <Header @header-height="headerHeight = $event" 
  @page-change="activePage = $event" 
  @language-change="language = $event"/>
  <main :style="{ marginTop: headerHeight + 'px' }">
    <Personal :data="personalData" v-if="activePage === 'Me'"></Personal>
    <Professional :data="professionalData" v-if="activePage === 'Work'"></Professional>
    <Vlog v-if="activePage === 'Vlog'"></Vlog>
  </main>
  <Footer />
</template>

<style>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
