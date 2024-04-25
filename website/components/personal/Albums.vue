<template>
  <div id="albums" class="border-red-500 border-dashed border-8 p-4" style="z-index: -1; overflow: hidden;">
    <div>
      <ImageTrack :data="posters" :title="'albums'"/>
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
      return props.data.covers;
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
  