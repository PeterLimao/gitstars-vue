<template>
    <section id="home-panel">
        <v-nav></v-nav>
        <home-header></home-header>
    </section>
</template>
<script>
    import HomeHeader from 'components/HomeHeader';
    import Nav from 'components/nav';

    export default {
        components: {
            HomeHeader,
            'v-nav': Nav
        }
    };
</script>
