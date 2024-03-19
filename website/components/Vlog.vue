<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Latest Articles</h1>

        <!-- Show button and div only if at least one article is expanded -->
        <div v-if="selectedArticle">
            <button @click="toggleAllExpand">Pressing this should untoggle The Expand</button>
            <div>{{ selectedArticle.contents }}</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Dummy Article Card -->
            <div v-for="article in articles" :key="article.id" class="bg-white shadow-md rounded-md p-4">
                <div @click="selectArticle(article)" class="cursor-pointer">
                    <img :src="article.image" alt="Article Image" class="w-full h-40 object-cover rounded-md mb-4">
                    <h2 class="text-lg font-semibold mb-2">{{ article.title }}</h2>
                    <p v-if="!article.expanded" class="text-gray-600 mb-4">{{ article.description }}</p>
                    <p v-else> Click here to read more </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [
                {
                    id: 1,
                    title: "Lorem Ipsum",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    image: "https://via.placeholder.com/400",
                    contents: "CONTENT CONTENT CONTENT",
                    expanded: false
                },
                {
                    id: 2,
                    title: "Dolor Sit Amet",
                    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: "https://via.placeholder.com/400",
                    contents: "CONTENT2 CONTENT2 CONTENT2",
                    expanded: false
                },
                {
                    id: 3,
                    title: "Consectetur Adipiscing Elit",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://via.placeholder.com/400",
                    contents: "CONTENT3 CONTENT3 CONTENT3",
                    expanded: false
                }
            ],
            selectedArticle: null
        };
    },
    methods: {
        toggleExpand(article) {
            article.expanded = !article.expanded;
        },
        selectArticle(article) {
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
