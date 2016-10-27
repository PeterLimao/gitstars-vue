<style lang="less" scoped>
    @import '~assets/style/common';

    /*基本样式*/
    #login {
        color: @base-puple;
        margin: 100px auto;
        text-align: center;
    }

    .btn {
        margin-top: 20px;
        background: @base-puple;
    }
</style>
<template>
    <div id="login">
        <i class="material-icons large">sentiment_dissatisfied</i>
        <h3>{{ $t('words.oop') }}</h3>
        <p>
            <span>{{{ $t('messages.loginMsg') }}}</span>
        </p>
        <a class="waves-effect waves-light btn" :href="thirdLink">
            {{ $t('words.login') }}
        </a>
    </div>
</template>
<script>
    import { signin } from 'api';

    export default {
        data () {
            return {
                thirdLink: signin()
            };
        }
    };
</script>
