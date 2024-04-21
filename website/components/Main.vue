<script>
import { ref, onMounted } from 'vue';

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup() {
        let activePage = ref('Me');
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
            activePage,
            backgroundOpacity
        };
    }
};
</script>



<template>
    <Header @header-height="handleHeaderHeight" @page-change="activePage = $event" @language-change="languageChange" />
    <main class="py-10">
        <div class="background-layer" :style="{ opacity: backgroundOpacity }"></div>
        <div class="content text-with-outline">
            <Personal :data="data.personal" v-if="activePage === 'Me'"></Personal>
            <Professional :data="data.professional" v-if="activePage === 'Work'"></Professional>
            <Vlog :data="data.articles" v-if="activePage === 'Vlog'"></Vlog>
        </div>
    </main>
    <Footer />
</template>

<style>
main {
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative; /* Ensure proper positioning of child elements */
}

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


.content {
    position: relative; /* Ensure child elements are positioned correctly */
    z-index: 1; /* Place content above background layer */
}

.text-with-outline {
  color: black; 
  text-shadow: 
    -1px -1px 0 #ffffffd5,  
     1px -1px 0 #ffffffd5,
    -1px  1px 0 #ffffffd5,
     1px  1px 0 #ffffffd5, /* Create outline */
     0px  0px 5px #ffffffd5; /* Light highlight */
  font-weight: bold; /* Set text to bold */
}

</style>
