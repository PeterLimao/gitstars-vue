<style>
    /*基本样式*/
    #readme-detail {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: #f9f9f9;
        overflow-y: scroll;
        padding-top: 50px;
        padding-bottom: 50px;
        z-index: 9990;
    }

    #readme-detail img {
        max-width: 100%;
    }

    #readme-detail h1 {
        font-size: 40px;
    }

    #readme-detail h2 {
        font-size: 30px;
    }

    #readme-detail h3 {
        font-size: 20px;
    }

    .error-msg {
        color: #673ab7;
        margin: 100px auto;
        text-align: center;
    }

    .back-btn {
        position: fixed;
        right: 10px;
        top: 10px;
        color: #673ab7;
        z-index: 999;
    }

    .markdown-detail {
        padding: 0 10px;
    }

    .detail-card {
        margin: 0 10px;
        overflow-x: hidden;
        word-wrap: break-word;
        padding: 10px 0;
    }

    /*动画样式*/
    .open-transition {
        transition: all 0.3s ease;
    }

    .open-enter, .open-leave {
        transform: translateX(-100%);
    }
</style>
<template>
    <div id="readme-detail" transition="open" class="z-depth-1">
        <div class="back-btn" v-touch:tap="close">
            <i class="material-icons small">clear</i>
        </div>
        <div class="detail-card">
            <div class="error-msg" v-if="!detailValue.readmeUrl">
                <i class="material-icons large">error</i>
                <h3>Oops!</h3>
                <span>This repo may not have .README file.</span>
            </div>
            <article class="markdown-detail">
                {{{markdownHtml}}}
            </article>
        </div>
    </div>
</template>
<script>
    import Actions from 'actions';
    import {Base64} from 'js-base64';
    import Marked from 'marked';

    export default {
        data () {
            return {
                markdownHtml: ''
            }
        },
        vuex: {
            getters: {
                detailValue (state) {
                    return state.detailValue;
                }
            },
            actions: {
                setLoad: Actions.setLoad
            }
        },
        ready () {
            if (this.detailValue.readmeUrl) {
                this.setLoad(true);
                this.$http.get(this.detailValue.readmeUrl).then((response) => {
                    this.setLoad(false);
                    this.markdownHtml = Marked(Base64.decode(response.data.content));
                });
            }
        },
        methods: {
            close () {
                this.$route.router.go(this.detailValue.backUrl);
            }
        }
    };
</script>
