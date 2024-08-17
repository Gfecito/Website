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
    const activePage = ref(null); // Initialize as null to indicate loading
    const isDarkMode = ref(false);
    const backgroundOpacity = ref(0);
    const language = ref("english");
    const renderKey = ref(0);
    const isLoading = ref(true); // Track loading state

    // Easing function for smoother animation
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    // Update scrollPosition and backgroundOpacity on scroll using requestAnimationFrame
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;
      const scrollPositionY = window.scrollY;
      const maxOpacityScroll = scrollHeight - windowHeight;

      // Calculate opacity based on scroll position using easing function
      backgroundOpacity.value = easeInOutQuad(
        Math.min(scrollPositionY / maxOpacityScroll, 1)
      );

      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        const parallaxFactor = 0.05;
        const backgroundOffsetY = scrollPositionY * parallaxFactor;
        document.querySelector(
          ".background-layer"
        ).style.transform = `translateY(-${backgroundOffsetY}px)`;
      });
    };

    onMounted(() => {
      // Initialize activePage based on URL parameter when component is mounted
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      const langParam = urlParams.get("lang");

      switch (langParam) {
        case "english":
        case "spanish":
        case "french":
          language.value = langParam;
          renderKey.value++;
          break;
        default:
          console.log(
            `Error; human language selected by user ${langParam} not recognized, couldn't abbreviate.`
          );
          language.value = "english";
          renderKey.value++;
      }
      switch (pageParam) {
        case "me":
          activePage.value = "me";
          break;
        case "work":
          activePage.value = "work";
          break;
        case "vlog":
          activePage.value = "vlog";
          break;
        default:
          activePage.value = "me"; // Default to Personal page
          break;
      }

      // Set loading to false after determining the active page
      isLoading.value = false;

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);
    });

    // Watch for changes in activePage and update URL
    watch(activePage, (newPage) => {
      if (typeof window !== "undefined" && newPage) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("page", newPage);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, "", newUrl);
      }
    });

    const theme = computed(() => {
      return isDarkMode.value ? "dark-mode" : "light-mode";
    });

    const background = computed(() => {
      let image = "";
      let suffix = isDarkMode.value ? "black.jpg" : "white.jpeg";
      switch (activePage.value) {
        case "me":
          image = "images/fractals/julia_fractal";
          break;
        case "work":
          image = "images/fractals/mandelbrot_spiral";
          break;
        case "vlog":
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
        case "spanish":
          return props.spanishData;
        case "french":
          return props.frenchData;
        case "english":
        default:
          return props.englishData;
      }
    });

    const languageChange = (newLanguage) => {
      console.log(`On main: ${newLanguage}`);
      switch (newLanguage) {
        case "english":
        case "spanish":
        case "french":
          language.value = newLanguage;
          renderKey.value++;
          break;
        default:
          console.log(
            `Error; human language selected by user ${newLanguage} not recognized, couldn't abbreviate.`
          );
      }
    };

    watch(language, (newLang) => {
      console.log(`Language changed to: ${newLang}`);
      if (typeof window !== "undefined" && newLang) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("lang", newLang);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, "", newUrl);
      }
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
      isLoading,
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
  <main
    v-if="!isLoading"
    :class="theme"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      class="background-layer"
      :style="{ opacity: backgroundOpacity, backgroundImage: background }"
    ></div>
    <Personal
      :data="translatedData.personal"
      :key="renderKey"
      v-if="activePage === 'me'"
    ></Personal>
    <Professional
      :key="renderKey"
      :data="englishData.professional"
      v-if="activePage === 'work'"
    ></Professional>
    <Vlog
      :data="englishData.articles"
      :key="renderKey"
      v-if="activePage === 'vlog'"
    ></Vlog>
    <Footer />
  </main>
  <div v-else class="loading-screen">
    <p>Loading...</p>
  </div>
</template>

<style>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white; /* Adjust to your preference */
}

.loading-screen p {
  font-size: 24px;
  color: black; /* Adjust text color to match theme */
}

.light-mode {
  position: relative; /* Ensure child elements are positioned correctly */
  color: black;
  text-shadow: -1px -1px 0 #ffffffd5, 1px -1px 0 #ffffffd5, -1px 1px 0 #ffffffd5,
    1px 1px 0 #ffffffd5, /* Create outline */ 0px 0px 5px #ffffffd5; /* Light highlight */
}

.dark-mode {
  position: relative; /* Ensure child elements are positioned correctly */
  color: #ffffffd5;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black, /* Create outline */ 0px 0px 5px black; /* Light highlight */
}
main {
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* Ensure proper positioning of child elements */
  padding-top: 40px;
  z-index: 0;
}

main * {
  z-index: 1;
}

.background-layer {
  position: fixed;
  top: -30%;
  left: 0;
  width: 100%;
  height: 200%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}
</style>
