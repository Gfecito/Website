<template>
  <div id="movies" class="p-4" style="z-index: -1; overflow: hidden;">
    <div>
      <ImageTrack :data="posters" :title="'movies'"/>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posters(props) {
      return props.data.posters;
    },
  }
};
</script>
  
<style scoped>
#movies {
  height: inherit;
  width: inherit;
  margin: 0rem;
  overflow: hidden;
}

.image-track {
  width: fit-content;
  height: inherit;
  display: flex;
  flex-direction: column;
  gap: 4vmin;
  /* position: fixed; */
  top: 0;
  overflow: hidden;
}

.image-track>img {
  width: 100%;
  margin: 0 auto;
  height: 220px;
  object-fit: cover;
  object-position: 100% 50%;
  filter: invert(0);
  user-select: none; /*Prevents ugly 'text selection' blue effect on drag*/
}

#image-track {
  left: 0%;
}


@media only screen and (min-width: 850px) {
  .image-track>img {
    width: min(95%, 300px);
    height: 330px;
  }
}
</style>
  