<template>
  <div class="background-layer" :style="{ opacity: backgroundOpacity }"></div>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Latest Articles</h1>

    <!-- Show button and div only if at least one article is expanded -->
    <div class="article ml-10 mr-10" v-if="selectedArticle">
      <button class="bold text-gray-400" @click="toggleAllExpand">
        Close article
      </button>

      <!-- New button to scroll to the bottom -->
      <button class="scroll-to-bottom-button" @click="scrollToBottom">
        Scroll to Bottom
      </button>

      <!-- Article content rendering -->
      <div v-for="(section, index) in selectedArticle.contents" :key="index">
        <template v-if="section.image">
          <img
            style="width: 50%; margin-left: 25%"
            :src="section.image"
            alt="Article"
            class="w-full h-auto object-cover rounded-md mb-4"
          />
          <figcaption v-if="section.caption" class="text-center text-gray-600">
            <a :href="section.link" target="_blank">
              {{ section.caption }}
            </a>
          </figcaption>
        </template>
        <template v-else-if="section.title">
          <h1 class="m-10 text-justify">{{ section.title }}</h1>
        </template>
        <template v-else-if="section.quote">
          <blockquote
            class="m-10 text-justify border-l-4 border-gray-500 pl-4 italic text-gray-700"
          >
            {{ section.quote }}
          </blockquote>
        </template>
        <template v-else-if="section.list && section.list.length">
          <ul class="m-10 text-justify list-disc list-inside">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </template>
        <template v-else>
          <div class="paragraph-container">
            <p
              class="m-10 text-justify"
              v-html="section.paragraph.join('<br />')"
            ></p>
          </div>
        </template>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="(article, index) in articles" :key="index">
        <div
          :class="[
            article.expanded ? 'selected' : '',
            'bg-white shadow-md rounded-md p-4',
          ]"
        >
          <div @click="selectArticle(article)" class="cursor-pointer">
            <img
              :src="article.image"
              alt="Article Image"
              class="w-full h-40 object-cover rounded-md mb-4"
            />
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
    this.articles = this.data.map((article) => ({
      ...article,
      expanded: false,
    }));
  },
  setup() {
    let backgroundOpacity = ref(0);

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
    });

    return {
      backgroundOpacity,
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
        behavior: "smooth", // Optional: Smooth scrolling effect
      });
    },
    toggleAllExpand() {
      this.articles.forEach((article) => {
        article.expanded = false;
      });
      this.selectedArticle = null;
    },
    scrollToBottom() {
      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
h1 {
  font-size: 2em;
  text-align: left;
}

br {
  display: block; /* makes it have a width */
  content: ""; /* clears default height */
  margin-top: 20px; /* change this to whatever height you want it */
}

.article {
  max-width: 80%;
  margin: auto;
  padding-bottom: 200px;
}

.selected {
  background-color: rgb(219 39 119);
}

/* Styling for the new scroll-to-bottom button */
.scroll-to-bottom-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
</style>
