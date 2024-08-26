<template>
  <div class="min-h-screen">
    <PersonalJourney :data="journeyData"></PersonalJourney>
    <div class="scroll-container" ref="photosContainer">
      <div class="scroll-content photos">
        <img :src="src" alt="" v-for="src in photoSources" />
        <img :src="src" alt="" v-for="src in photoSources" />
      </div>
    </div>
    <div class="books-container">
      <PersonalMovies :data="moviesData"></PersonalMovies>
      <PersonalBooks :books="booksData" />
      <PersonalAlbums :data="albumsData"></PersonalAlbums>
    </div>
    <div class="scroll-container" ref="paintingsContainer">
      <div class="scroll-content paintings">
        <img :src="src" alt="" v-for="src in paintingSources" />
        <img :src="src" alt="" v-for="src in paintingSources" />
      </div>
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
  data() {
    return {
      journeyData: null,
      booksData: null,
      moviesData: null,
      albumsData: null,
      paintingSources: [
        "images/paintings/kahlo_recuerdo.webp",
        "images/paintings/guernica.jpg",
        "images/paintings/graham_churchill.jpg",
        "images/paintings/shiva_lord_of_dance.jpeg",
        "images/paintings/toledo_lady_caracol.jpeg",
      ],
      photoSources: [
        "images/photos/guardian_rhino.webp",
        "images/photos/mosse_congo.jpg",
        "images/photos/guardian_monkeys.webp",
        "images/photos/mosse_refugees.webp",
        "images/photos/guardian_lizard.webp",
        "images/photos/business_power.webp",
        "images/photos/henri_children_seville.webp",
        "images/photos/guardian_monkey.webp",
        "images/photos/business_flowers.webp",
        "images/photos/guardian_elephant.webp",
        "images/photos/atlantic_protester_takes_knee.avif",
        "images/photos/atlantic_hug.avif",
        "images/photos/business_tiananmen.webp",
      ],
    };
  },
  created() {
    this.journeyData = this.data.journey;
    this.booksData = this.data.books;
    this.moviesData = this.data.movies;
    this.albumsData = this.data.albums;
  },
  mounted() {
    this.setScrollAnimation(this.$refs.photosContainer, "photos", 100);
    this.setScrollAnimation(this.$refs.paintingsContainer, "paintings", 35);
  },
  methods: {
    setScrollAnimation(container, type, duration) {
      const content = container.querySelector(`.${type}`);
      const images = content.querySelectorAll("img");

      let imagesLoaded = 0;

      // Function to check if all images are loaded
      const checkImagesLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          // Ensure the content div width is updated
          content.style.width = `${content.scrollWidth}px`;
          content.style.animation = `scroll-left-${type} ${duration}s linear infinite`;
          this.injectKeyframes(content.scrollWidth, type);
        }
      };

      // Check if images are already loaded
      images.forEach((img) => {
        if (img.complete) {
          checkImagesLoaded();
        } else {
          img.addEventListener("load", checkImagesLoaded);
        }
      });
    },

    injectKeyframes(totalWidth, type) {
      const keyframes = `
      @keyframes scroll-left-${type} {
        from {
          transform: translateX(${
            type === "photos" ? "0" : `-${totalWidth / 2.0}px`
          });
        }
        to {
          transform: translateX(${
            type === "photos" ? `-${totalWidth / 2.0}px` : "0"
          });
        }
      }
    `;

      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.scroll-container {
  height: 300px;
  width: fit-content;
  position: relative;
}

.scroll-content {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.paintings {
  padding-top: 50px;
  padding-bottom: 20px;
}

.photos {
  padding-bottom: 20px;
}

.paintings img,
.photos img {
  max-height: 100%;
  border-radius: 40px;
  width: auto;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.paintings img {
  margin-left: 40px;
  margin-right: 40px;
}

.photos img {
  margin-left: 20px;
  margin-right: 20px;
}

.books-container {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-gap: 5%;
  width: 100%;
  height: 900px;
}

/* General mobile styling */
@media only screen and (max-width: 768px) {
  .books-container {
    grid-template-columns: 1fr;
    height: 800px;
  }

  .scroll-container {
    height: 150px; /* Reduce height for mobile */
  }

  .paintings img,
  .photos img {
    max-height: 100px; /* Reduce image height */
    margin-left: 10px;
    margin-right: 10px;
  }

  .paintings {
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .photos {
    padding-bottom: 10px;
  }

  /* Hide movies and albums on mobile */
  #movies,
  #albums {
    display: none;
  }

  /* Adjust grid layout for the PersonalJourney component */
  .min-h-screen {
    padding: 10px; /* Adjust padding */
  }
}

/* For slightly larger mobile devices or tablets */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .books-container {
    grid-template-columns: 1fr;
    height: 850px;
  }

  .scroll-container {
    height: 200px; /* Moderate height reduction */
  }

  .paintings img,
  .photos img {
    max-height: 150px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .paintings {
    padding-top: 30px;
    padding-bottom: 15px;
  }

  .photos {
    padding-bottom: 15px;
  }

  /* Still hide movies and albums */
  #movies,
  #albums {
    display: none;
  }

  /* Adjust grid layout for the PersonalJourney component */
  .min-h-screen {
    padding: 20px; /* Moderate padding adjustment */
  }
}
</style>
