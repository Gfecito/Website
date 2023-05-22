<script setup>
const version = 2 + 1
</script>

<template>
  <Header></Header>
  <div class="hello">
    Hello Nuxt {{ version }}!
  </div>
  <Footer></Footer>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style>
