<template>
    <section id="home-panel">
        <v-nav></v-nav>
        <home-header></home-header>
        <list-content></list-content>
    </section>
</template>
<script>
    import HomeHeader from 'components/HomeHeader';
    import Nav from 'components/nav';
    import ListContent from 'components/ListContent';

    export default {
        components: {
            HomeHeader,
            ListContent,
            'v-nav': Nav
        }
    };
</script>
