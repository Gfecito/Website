<script>
import { ref } from 'vue';

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup() {
        let activePage = ref('Me');

        return {
            activePage
        };
    }
};
</script>



<template>
    <Header @header-height="handleHeaderHeight" @page-change="activePage = $event" @language-change="languageChange" />
    <main class="py-10">
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

.content {
    position: relative; /* Ensure child elements are positioned correctly */
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
