<style>
    /*基本样式*/
    #readme-detail {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        min-height: 100%;
        background: #f9f9f9;
        overflow-y: scroll;
        padding-top: 50px;
        padding-bottom: 50px;
        z-index: 800;
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

    .back-btn {
        position: fixed;
        right: 0;
        top: 0;
        color: #673ab7;
        z-index: 9999;
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
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
    <div id="readme-detail" transition="open" :style="readmeDetailStyle">
        <div class="back-btn" v-touch:tap="close">
            <i class="material-icons">clear</i>
        </div>
        <file-nav :owner="detailValue.owner" :repo="detailValue.repo"></file-nav>
        <div class="detail-card">
            <not-found v-if="!detailValue.readmeUrl"></not-found>
            <article class="markdown-detail">
                {{{markdownHtml}}}
            </article>
        </div>
    </div>
</template>
<script>
    import {setLoad} from 'actions';
    import {Base64} from 'js-base64';
    import Marked from 'marked';
    import FileNav from 'components/fileNav';
    import NotFound from 'components/notFound';

    export default {
        data () {
            return {
                markdownHtml: '',
                readmeDetailStyle: {}
            }
        },
        vuex: {
            getters: {
                detailValue: (state) => state.detailValue
            },
            actions: {
                setLoad
            }
        },
        route: {
            activate () {
                this.initData();
            }
        },
        methods: {
            initData () {
                this.markdownHtml = '';
                if (this.detailValue.readmeUrl) {
                    this.setLoad(true);
                    this.$http.get(this.detailValue.readmeUrl).then((response) => {
                        this.setLoad(false);
                        this.markdownHtml = Marked(Base64.decode(response.data.content));
                    }).catch((err) => {
                        if (err.status === 404) {
                            this.setLoad(false);
                            this.detailValue.readmeUrl = '';
                        }
                    });
                }
            },
            close () {
                this.$route.router.go(this.detailValue.backUrl);
                this.$broadcast('hideFileNav');
                this.setLoad(false);
            }
        },
        events: {
            isHiddenScroll (isHidden) {
                if (isHidden) {
                    this.readmeDetailStyle = {'overflow-y': 'hidden', 'height': '100%'};
                } else {
                    this.readmeDetailStyle = {};
                }
            }
        },
        components: {
            FileNav,
            NotFound
        }
    };
</script>
