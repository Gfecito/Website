<script>
import data from "~/data/content.json";

export default {
  setup() {
    const content = data;
    return {
      content,
    };
  },
};
</script>

<template>
  <Main
    :englishData="content.en"
    :spanishData="content.es"
    :frenchData="content.fr"
  />
</template>

<style>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
