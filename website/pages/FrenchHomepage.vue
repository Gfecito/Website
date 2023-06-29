<script>
import data from '~/data/content.json';
import { ref } from 'vue';

export default {
    props: {
        activePage: {
            type: Object,
            required: true,
        },
    },
    setup() {
        let activePage = ref('Me');
        const content = data.fr;
        const professionalData = content['professional'];
        const personalData = content['personal'];

        return {
            activePage,
            professionalData,
            personalData
        };
    }
};
</script>


<template>
    <Header @header-height="handleHeaderHeight" @page-change="activePage = $event" @language-change="languageChange" />
    <main :style="{ marginTop: headerHeight + 'px' }">
        <Personal :data="personalData" v-if="activePage === 'Me'">
        </Personal>
        <Professional :data="professionalData" v-if="activePage === 'Work'"></Professional>
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
