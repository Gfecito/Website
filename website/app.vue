<script>
import data from '~/data/content.json';
import { ref } from 'vue';

export default {
  setup() {
    let activePage = ref('Me');
    const english = data.en;
    const french = data.fr;
    const spanish = data.es;

    const professionalData = computed(() => {
      switch (this.language) {
        case 'en':
          return data.en['professional'];
        case 'es':
          return data.es['professional'];
        case 'fr':
          return data.fr['professional'];
        default:
          return data.en['professional'];
      }
    });

    const personalData = computed(() => {
      switch (this.language) {
        case 'en':
          return data.en['personal'];
        case 'es':
          return data.es['personal'];
        case 'fr':
          return data.fr['personal'];
        default:
          return data.en['personal'];
      }
    });

    function languageChange(language) {
      console.log(`On app: ${language}`);
      this.language = language; // Update the language variable
    }

    return {
      activePage,
      english,
      french,
      spanish,
      professionalData,
      languageChange
    };
  },
  data() {
    return {
      language: 'en',
    };
  }
};
</script>


<template>
  <Header @header-height="handleHeaderHeight" @page-change="activePage = $event" @language-change="languageChange" />
  <main :style="{ marginTop: headerHeight + 'px' }">
    <Personal :data="english['personal']" v-if="activePage === 'Me'">
    </Personal>
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
