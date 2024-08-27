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
      const scrollPositionY = Math.max(500, window.scrollY);
      const maxOpacityScroll = scrollHeight - windowHeight;
      // Set minimum opacity at 40% of max
      const minOpacityScroll = Math.max(
        scrollPositionY,
        (scrollHeight - windowHeight) * 0.3
      );

      // Calculate opacity based on scroll position using easing function
      backgroundOpacity.value = easeInOutQuad(
        Math.min(minOpacityScroll / maxOpacityScroll, 1) * 0.6
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
        case "ingles":
        case "anglais":
        case "spanish":
        case "español":
        case "espagnol":
        case "french":
        case "frances":
        case "français":
          language.value = langParam;
          renderKey.value++;
          break;
        default:
          console.log(
            `Error; human language selected by user ${langParam} not recognized, couldn't select.`
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
        case "blog":
          activePage.value = "blog";
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
        case "blog":
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
        case "español":
        case "espagnol":
          return props.spanishData;
        case "french":
        case "frances":
        case "français":
          return props.frenchData;
        case "english":
        case "ingles":
        case "anglais":
        default:
          return props.englishData;
      }
    });

    const languageChange = (newLanguage) => {
      console.log(`On main: ${newLanguage}`);
      switch (newLanguage) {
        case "english":
        case "ingles":
        case "anglais":
        case "spanish":
        case "español":
        case "espagnol":
        case "french":
        case "frances":
        case "français":
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
    :data="translatedData.header"
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
    <!-- Neon light layer -->
    <div class="neon-light-layer"></div>
    <Personal
      :data="translatedData.personal"
      :key="renderKey"
      v-if="activePage === 'me'"
    ></Personal>
    <Professional
      :key="renderKey"
      :data="translatedData.professional"
      v-if="activePage === 'work'"
    ></Professional>
    <Vlog
      :data="translatedData.articles"
      :key="renderKey"
      v-if="activePage === 'blog'"
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

.light-mode .glass-card {
  /* color: white;
  text-shadow: -1px -1px 0 #000000d5, 1px -1px 0 #000000d5, -1px 1px 0 #000000d5,
    1px 1px 0 #000000d5, 0px 0px 5px #000000d5; */
  background: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 0.2),
    /* maximum opacity at the top */ rgba(0, 0, 0, 0.01)
      /* more transparency at the bottom */
  );
  backdrop-filter: blur(10px); /* Creates a glassy effect */
  position: relative; /* Required for positioning pseudo-elements */
  border-top: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 15px; /* Rounded corners only on top */
}

.light-mode .glass-card::before,
.light-mode .glass-card::after {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.02)
  );
}

.dark-mode {
  position: relative; /* Ensure child elements are positioned correctly */
  color: #ffffffd5;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black, /* Create outline */ 0px 0px 5px black; /* Light highlight */
}

.dark-mode .glass-card {
  /* color: white;
  text-shadow: -1px -1px 0 #000000d5, 1px -1px 0 #000000d5, -1px 1px 0 #000000d5,
    1px 1px 0 #000000d5, 0px 0px 5px #000000d5; */
  background: linear-gradient(
    to bottom,
    rgb(255, 255, 255, 0.2),
    /* maximum opacity at the top */ rgba(255, 255, 255, 0.01)
      /* more transparency at the bottom */
  );
  backdrop-filter: blur(10px); /* Creates a glassy effect */
  position: relative; /* Required for positioning pseudo-elements */
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 15px; /* Rounded corners only on top */
}

.dark-mode .glass-card::before,
.dark-mode .glass-card::after {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.02)
  );
}

.dark-mode .gray {
  color: rgb(212, 230, 255);
  text-shadow: none;
}

.light-mode .article-thumbnail {
  background-color: rgba(255, 255, 255, 0.5);
  border-color: rgba(130, 130, 130, 0.2);
}

.dark-mode .article-thumbnail {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: rgba(154, 154, 154, 0.2);
}

.dark-mode .title {
  position: relative; /* Ensure child elements are positioned correctly */
  color: black;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
    1px 1px 0 white, /* Create outline */ 0px 0px 5px rgba(186, 186, 186, 0.706); /* Light highlight */
}

main {
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* Ensure proper positioning of child elements */
  padding-top: 40px;
  z-index: 0;
  overflow: hidden;
}

main * {
  z-index: 1;
}

.background-layer {
  position: fixed;
  top: -30%;
  left: 0;
  width: 100%;
  height: 250%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}

.gray {
  color: gray;
}

.neon-light-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Behind the content */
  pointer-events: none; /* Ensure it doesn’t block interaction */
  display: flex;
  justify-content: space-between;
}

.dark-mode .neon-light-layer::before,
.dark-mode .neon-light-layer::after {
  background: linear-gradient(
    to right,
    rgba(12, 71, 153, 0.6) 0%,
    rgba(12, 71, 153, 0.2) 1%,
    rgba(12, 71, 153, 0.05) 15%,
    transparent 60%
  );
}

.light-mode .neon-light-layer::before,
.light-mode .neon-light-layer::after {
  background: linear-gradient(
    to right,
    rgba(12, 71, 153, 0.6) 0%,
    rgba(12, 71, 153, 0.2) 1%,
    rgba(12, 71, 153, 0.02) 15%,
    transparent 60%
  );
}

.neon-light-layer::before,
.neon-light-layer::after {
  content: "";
  width: 50%;
  height: 100%; /* Extend beyond the viewport */
  pointer-events: none;
  animation: pulse 5s infinite;
}

.neon-light-layer::after {
  transform: scaleX(-1); /* Mirror the gradient for the right side */
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
</style>
