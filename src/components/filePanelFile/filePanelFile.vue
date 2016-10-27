<style lang="less">
    @import '~highlightjs/styles/github.css';

    /*基本样式*/
    .file-panel-file {
        overflow: scroll;
        -webkit-overflow-scrolling : touch;
        padding: 10px;
        height: 100%;
        width: 100%;
    }

    pre {
        text-indent: -4.8rem;
    }

    .hljs {
        background: #f1f1f1;
    }
</style>
<template>
    <div class="file-panel-file">
        <pre :style="preStyle">
            {{ fileContent }}
        </pre>
    </div>
</template>
<script>
    import hljs from 'highlightjs/highlight.pack.min';

    export default {
        data () {
            return {
                fileContent: ''
            };
        },
        methods: {
            setCode () {
                const pre = this.$el.querySelector('pre');
                hljs.highlightBlock(pre);
            }
        },
        events: {
            setFileView (content) {
                this.fileContent = content;
                const t = setTimeout(() => {
                    this.setCode();
                    clearTimeout(t);
                });
            }
        }
    };
</script>
