<script setup>
import data from '~/data/content.json';
import { ref } from 'vue';

const language = "en";
let translated_data;
switch (language) {
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
    console.log("Error; human language selected by user not recognized");
}

let activePage = ref('Me');

let personalData = translated_data["personal"];
let professionalData = translated_data["professional"];
</script>

<template>
  <Header @header-height="headerHeight = $event" 
  @page-change="activePage = $event"/>
  <main :style="{ marginTop: headerHeight + 'px' }">
    <Personal :data="personalData" v-if="activePage === 'Me'"></Personal>
    <Professional :data="professionalData" v-if="activePage === 'Work'"></Professional>
    <Vlog v-if="activePage === 'Vlog'"></Vlog>
  </main>
  <Footer/>
</template>

<style>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
