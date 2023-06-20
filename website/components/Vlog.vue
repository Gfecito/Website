<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Latest Articles</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Dummy Article Card -->
            <div v-for="article in articles" :key="article.id" class="bg-white shadow-md rounded-md p-4">
                <img :src="article.image" alt="Article Image" class="w-full h-40 object-cover rounded-md mb-4">
                <h2 class="text-lg font-semibold mb-2">{{ article.title }}</h2>
                <p class="text-gray-600 mb-4">{{ article.description }}</p>
                <a :href="article.link" class="text-blue-500 hover:underline">Read More</a>
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
                    link: "#"
                },
                {
                    id: 2,
                    title: "Dolor Sit Amet",
                    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: "https://via.placeholder.com/400",
                    link: "#"
                },
                {
                    id: 3,
                    title: "Consectetur Adipiscing Elit",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://via.placeholder.com/400",
                    link: "#"
                }
            ]
        };
    }
};
</script>
  
<style>
/* Add custom styles if needed */
</style>
  