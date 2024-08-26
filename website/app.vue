<script>
import { ref } from 'vue';

export default {
  setup() {
    let activePage = ref('Me');
    return {
      activePage
    };
  }
};
</script>


<template>
  <NuxtPage/>
</template>

<style>
</style>
