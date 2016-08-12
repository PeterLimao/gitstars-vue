<style scoped>
    @import '../assets/style/common';

    #not-found {
        color: $base-puple;
        margin: 100px auto;
        text-align: center;
    }
</style>
<template>
    <div id="not-found">
        <i class="material-icons large">error</i>
        <h3>Oops!</h3>
        <span>{{content}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            content: {
                type: String,
                default: 'This repo may not have .README file.'
            }
        }
    };
</script>
