<template>
    <footer class="bg-gray-800 text-white py-4">
        <div class="flex justify-center">
            <img src="~/assets/githubIcon.svg" alt="Icon 1" class="icon-image mr-auto ml-auto">
            <img src="~/assets/linkedinIcon.svg" alt="Icon 2" class="icon-image mr-auto ml-auto">
        </div>
    </footer>
</template>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999; /* Adjust the z-index as needed */
}

.icon-image {
    width: 18px;
    height: 18px;
}
</style>
