<template>
    <div>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script>
  import data from '~/data/content.json';
  
  const language = "es";
  let content;
  switch(language){
    case "en":
      content = data.en;
      break;
    case "es":
      content = data.es;
      break;
    case "fr":
      content = data.fr;
      break;
    default:
      console.log("Error; human language selected by user not recognized")
  }


  console.log(content);
  export default {
  }
  </script>
  