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
    <main :style="{ marginTop: headerHeight + 'px' }">
        <Personal :data="data.personal" v-if="activePage === 'Me'">
        </Personal>
        <Professional :data="data.professional" v-if="activePage === 'Work'"></Professional>
        <Vlog v-if="activePage === 'Vlog'"></Vlog>
    </main>
    <Footer />
</template>

<style>
main {
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
