<style scoped>
    /*基本样式*/
    #login {
        color: #673ab7;
        margin: 100px auto;
        text-align: center;
    }

    .btn {
        margin-top: 20px;
        background: #673ab7;
    }
</style>
<template>
    <div id="login">
        <i class="material-icons large">sentiment_dissatisfied</i>
        <h3>Oops!</h3>
        <p>
            <span>You may not login or invalid expired</span><br>
            <span>Click Here to: </span>
        </p>
        <a class="waves-effect waves-light btn" :href="thirdLink">Login</a>
    </div>
</template>
<script>
    import {signin} from 'api';

    export default {
        data () {
            return {
                thirdLink: signin()
            }
        }
    };
</script>
