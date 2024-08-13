<script>
import { ref, computed, onMounted, watch } from "vue";

export default {
  props: {
    englishData: {
      type: Object,
      required: true,
    },
    spanishData: {
      type: Object,
      required: true,
    },
    frenchData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const activePage = ref("Me");
    const isDarkMode = ref(false);
    const backgroundOpacity = ref(0);
    const language = ref("English"); // Ref to keep track of the current language
    const renderKey = ref(0); // This key will be used to force re-render

    // Easing function for smoother animation
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    // Update scrollPosition and backgroundOpacity on scroll using requestAnimationFrame
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;
      const scrollPositionY = window.scrollY;
      const maxOpacityScroll = scrollHeight - windowHeight; // Bottom of the page

      // Calculate opacity based on scroll position using easing function
      backgroundOpacity.value = easeInOutQuad(
        Math.min(scrollPositionY / maxOpacityScroll, 1)
      );

      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        const parallaxFactor = 0.05; // Adjust this value for desired parallax effect strength
        const backgroundOffsetY = scrollPositionY * parallaxFactor;
        document.querySelector(
          ".background-layer"
        ).style.transform = `translateY(-${backgroundOffsetY}px)`;
      });
    };

    // Add debounced scroll event listener on component mount
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);

      // Check for URL parameter 'page'
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");

      // Use switch-case to set activePage based on the pageParam value
      switch (pageParam) {
        case "Work":
          activePage.value = "Work";
          break;
        case "Vlog":
          activePage.value = "Vlog";
          break;
        case "Me":
        default:
          activePage.value = "Me"; // Default to Personal page
          break;
      }
    });

    // Watch for changes in activePage and update URL
    watch(activePage, (newPage) => {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", newPage);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    });

    const theme = computed(() => {
      return isDarkMode.value ? "dark-mode" : "light-mode";
    });

    const background = computed(() => {
      let image = "";
      let suffix = isDarkMode.value ? "black.jpg" : "white.jpeg";
      switch (activePage.value) {
        case "Me":
          image = "images/fractals/julia_fractal";
          break;

        case "Work":
          image = "images/fractals/mandelbrot_spiral";
          break;

        case "Vlog":
          image = "images/fractals/mandelbrot_shells";
          break;

        default:
          break;
      }
      return `url('${image}_${suffix}')`;
    });

    const backgroundColor = computed(() => {
      return isDarkMode.value ? "black" : "white";
    });

    const translatedData = computed(() => {
      switch (language.value) {
        case "Spanish":
          return props.spanishData;
        case "French":
          return props.frenchData;
        case "English":
        default:
          return props.englishData;
      }
    });

    const languageChange = (newLanguage) => {
      console.log(`On main: ${newLanguage}`);
      switch (newLanguage) {
        case "English":
        case "Spanish":
        case "French":
          language.value = newLanguage;
          renderKey.value++; // Increment the key to force a re-render
          break;
        default:
          console.log(
            `Error; human language selected by user ${newLanguage} not recognized, couldn't abbreviate.`
          );
      }
    };

    // Watch for language changes and log them for debugging
    watch(language, (newLang) => {
      console.log(`Language changed to: ${newLang}`);
    });

    return {
      activePage,
      isDarkMode,
      backgroundOpacity,
      theme,
      background,
      backgroundColor,
      translatedData,
      languageChange,
      renderKey,
    };
  },
};
</script>

<template>
  <Header
    @language-change="languageChange"
    @theme-change="isDarkMode = $event"
    @page-change="activePage = $event"
  />
  <main :class="theme" :style="{ backgroundColor: backgroundColor }">
    <div
      class="background-layer"
      :style="{ opacity: backgroundOpacity, backgroundImage: background }"
    ></div>
    <Personal
      :data="translatedData.personal"
      :key="renderKey"
      v-if="activePage === 'Me'"
    ></Personal>
    <Professional
      :key="renderKey"
      :data="englishData.professional"
      v-if="activePage === 'Work'"
    ></Professional>
    <Vlog
      :data="englishData.articles"
      :key="renderKey"
      v-if="activePage === 'Vlog'"
    ></Vlog>
  </main>
  <Footer />
</template>

<style>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* Ensure proper positioning of child elements */
  padding-top: 40px;
}

.light-mode {
  position: relative; /* Ensure child elements are positioned correctly */
  color: black;
  text-shadow: -1px -1px 0 #ffffffd5, 1px -1px 0 #ffffffd5, -1px 1px 0 #ffffffd5,
    1px 1px 0 #ffffffd5, /* Create outline */ 0px 0px 5px #ffffffd5; /* Light highlight */
  font-weight: bold; /* Set text to bold */
}

.dark-mode {
  position: relative; /* Ensure child elements are positioned correctly */
  color: #ffffffd5;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black, /* Create outline */ 0px 0px 5px black; /* Light highlight */
  font-weight: bold; /* Set text to bold */
}

main {
  z-index: 0;
}

main * {
  z-index: 1;
}

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}
</style>
