<template>
    <section id="home-panel">
        <v-nav></v-nav>
        <home-header></home-header>
        <list-content></list-content>
    </section>
</template>
<script>
    import HomeHeader from 'components/homeHeader';
    import Nav from 'components/nav';
    import ListContent from 'components/listContent';

    export default {
        components: {
            HomeHeader,
            ListContent,
            'v-nav': Nav
        }
    };
</script>
