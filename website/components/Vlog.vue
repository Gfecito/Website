<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Latest Articles</h1>

        <!-- Show button and div only if at least one article is expanded -->
        <div v-if="selectedArticle">
            <button @click="toggleAllExpand">Pressing this should untoggle The Expand</button>
            <!-- This should be an array instead, and make a parragraph on element, and an image on images-->
            <div>{{ selectedArticle.contents }}</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Dummy Article Card -->
            <div v-for="article in articles" :key="article.id">
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
        type: Object,
        required: true,
        },
  },
    data() {
        return {
        articles: null,
        selectedArticle: null
        };
    },
    created() {
        this.articles = this.data;
    },
    methods: {
        toggleExpand(article) {
            article.expanded = !article.expanded;
        },
        selectArticle(article) {
            this.toggleAllExpand()
            this.selectedArticle = article;
            this.toggleExpand(article);
        },
        toggleAllExpand() {
            this.articles.forEach(article => {
                article.expanded = false;
            });
            this.selectedArticle = null;
        }
    }
};
</script>

<style>
/* Add custom styles if needed */
</style>
