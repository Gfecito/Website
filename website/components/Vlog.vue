<template>
    <div class="background-layer" :style="{ opacity: backgroundOpacity }"></div>
    <div class="container mx-auto py-8">
      <h1 class="text-2xl font-bold mb-4">Latest Articles</h1>
  
      <!-- Show button and div only if at least one article is expanded -->
      <div class="ml-10 mr-10" v-if="selectedArticle">
        <button @click="toggleAllExpand">Pressing this should untoggle The Expand</button>
        <!-- This should be an array instead, and make a paragraph on each element, and an image for images -->
        <div v-for="(section, index) in selectedArticle.contents" :key="index">
        <!-- Check if section is an image or paragraph -->
        <template v-if="section.image">
          <img style="width: 50%; margin-left: 25%;" :src="section.image" alt="Article" class="w-full h-auto object-cover rounded-md mb-4">
        </template>
        <template v-else-if="section.title">
          <h1 class="m-10 text-justify">{{ section.title }}</h1>
        </template>
        <template v-else>
          <div class="paragraph-container">
            <p class="m-10 text-justify" v-html="section.paragraph.join('<br />')"></p>
          </div>
        </template>
      </div>
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="(article, index) in articles" :key="index">
          <div class="bg-white shadow-md rounded-md p-4">
            <div v-if="!article.expanded" @click="selectArticle(article)" class="cursor-pointer">
              <img :src="article.image" alt="Article Image" class="w-full h-40 object-cover rounded-md mb-4">
              <h2 class="text-lg font-semibold mb-2">{{ article.title }}</h2>
              <p class="text-gray-600 mb-4">{{ article.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        articles: null,
        selectedArticle: null,
      };
    },
    created() {
      // Set the "expanded" field to false and remove the "id" field from each article
      this.articles = this.data.map(article => ({
        ...article,
        expanded: false,
      }));
    },
    setup() {
      let backgroundOpacity = ref(0);

      // Easing function for smoother animation
      const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      // Update scrollPosition and backgroundOpacity on scroll using requestAnimationFrame
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        const scrollPositionY = window.scrollY;
        const maxOpacityScroll = scrollHeight - windowHeight; // Bottom of the page

        // Calculate opacity based on scroll position using easing function
        backgroundOpacity.value = easeInOutQuad(Math.min(scrollPositionY / maxOpacityScroll, 1));

        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            const parallaxFactor = 0.05; // Adjust this value for desired parallax effect strength
            const backgroundOffsetY = scrollPositionY * parallaxFactor;
            document.querySelector('.background-layer').style.transform = `translateY(-${backgroundOffsetY}px)`;
        });
      };

      // Add debounced scroll event listener on component mount
      onMounted(() => {
          window.addEventListener('scroll', handleScroll);
      });

      return {
          backgroundOpacity
      };
    },
    methods: {
      toggleExpand(article) {
        article.expanded = !article.expanded;
      },
      selectArticle(article) {
        this.toggleAllExpand();
        this.selectedArticle = article;
        this.toggleExpand(article);
        // Scroll to the top of the page
        window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: Smooth scrolling effect
            });
      },
      toggleAllExpand() {
        this.articles.forEach(article => {
          article.expanded = false;
        });
        this.selectedArticle = null;
      },
    },
  };
  </script>
  
  <style>
  .background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-image: url('images/fractals/mandelbrot_shells_white.jpeg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    transition: opacity 0.3s ease, transform 0.3s ease; /* Add transform transition */
}

  h1{
    font-size: 2em;
  }

  br {
    display: block; /* makes it have a width */
    content: ""; /* clears default height */
    margin-top: 20px; /* change this to whatever height you want it */
  }
  </style>
  