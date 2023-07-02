<script>
import data from '~/data/content.json';

export default {
    setup() {
        const content = data.es;
        return {
            content
        };
    }
};
</script>


<template>
    <Main :data ="content"/>
</template>

<style>
main {
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
