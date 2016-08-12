<style scoped>
    @import '../assets/style/common';

    /*基本样式*/
    #welcome-loading {
        position(fixed, $z-index-level-3);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: $base-puple;
    }

    pre {
        position(absolute);
        text-indent: -4.8rem;
        left: 50%;
        top: 50%;
        height: 180px;
        width: 220px;
        margin-left: -(@width / 2);
        margin-top: -(@height / 2);
        color: $base-white;
        font-weight: bold;
        padding: 10px;
    }

    .skip-text {
        position(absolute, $z-index-level-3);
        right: 10px;
        top: 10px;
        color: $base-white;
        font-style: italic;
    }

    .fade-transition {
        base-trans()
    }

    .fade-leave {
        transform: translateY(-100%);
    }
</style>
<template>
    <div id="welcome-loading" v-if="isShow" transition="fade">
        <pre>
            {{innerContent}}
        </pre>
        <span class="skip-text" v-touch:tap="close">
            Skip
        </span>
    </div>
</template>
<script>
    import {getConfig} from 'api';

    export default {
        data () {
            return {
                innerContent: '',
                content: '',
                isShow: true,
            }
        },
        ready () {
            this.innerContent = '';
            getConfig().then((response) => {
                this.content = response.data.welcome;
                this.renderContent(() => {
                    let index = 1;
                    let interval = setInterval(() => {
                        if (index > 4) {
                            clearInterval(interval);
                            this.isShow = false;
                        }
                        if (index % 2 === 0) {
                            this.innerContent = this.innerContent + '_';
                        } else {
                            this.innerContent = this.innerContent.substring(0, this.innerContent.length - 1);
                        }
                        index++;
                    }, 500);
                });
            });
        },
        methods: {
            renderContent (callback) {
                let index = 0;
                let interval = setInterval(() => {
                    if (index >= this.content.length) {
                        clearInterval(interval);
                        if (callback) callback();
                        return;
                    }
                    this.innerContent = this.innerContent.substring(0, this.innerContent.length - 1);
                    this.innerContent += this.content.charAt(index) + '_';
                    index++;
                }, 150);
            },
            close () {
                this.isShow = false;
            }
        }
    };
</script>
