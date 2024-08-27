<script setup>
import data from "~/data/content.json";
import { useSeoMeta } from "#imports";

const content = data;

useSeoMeta({
  title: "Who's Santiago?",
  ogTitle: "Who's Santiago?",
  description: "Who even is Santiago?",
  ogDescription: "Who even is Santiago?",
  ogImage:
    "https://santiagomez-website.web.app/images/fractals/julia_fractal_black.jpg",
  twitterCard: "summary_large_image",
  ogType: "website",
});
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
