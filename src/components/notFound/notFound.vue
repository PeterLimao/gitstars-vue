<style lang="less" scoped>
    @import '~assets/style/common';

    #not-found {
        color: @base-puple;
        margin: 100px auto;
        text-align: center;
    }
</style>
<template>
    <div id="not-found">
        <i class="material-icons large" v-if="type === 'noNet'">signal_wifi_off</i>
        <i class="material-icons large" v-else>error</i>
        <h3>{{ $t('words.oop') }}</h3>
        <span v-if="type === 'noReadme'">{{ $t('messages.noReadme') }}</span>
        <span v-if="type === 'noResult'"> {{ $t('messages.noResult') }}</span>
        <span v-if="type === 'noNet'">{{ $t('messages.noNet') }}</span>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            type: {
                type: String,
                required: true
            }
        }
    };
</script>
