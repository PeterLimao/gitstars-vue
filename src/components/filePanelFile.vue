<style>
    @import '~highlightjs/styles/default.css';
    /*基本样式*/
    .file-panel-file {
        border-top: 1px solid rgba(160, 160, 160, 0.2);
        overflow-x: scroll;
        padding: 10px;
    }
</style>
<template>
    <div class="file-panel-file">
        <pre :style="preStyle">
            {{fileContent}}
        </pre>
    </div>
</template>
<script>
    import hljs from 'highlightjs/highlight.pack.min';

    export default {
        ready () {
            let pre = this.$el.querySelector('pre');
            hljs.highlightBlock(pre);
        },
        props: {
            fileContent: {
                type: String,
                default: ''
            },
            preStyle: {
                type: Object,
                default () {
                    return {
                        'text-indent': '-4.8rem'
                    }
                }
            }
        }
    };
</script>
