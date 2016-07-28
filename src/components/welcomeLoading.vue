<style scoped>
    /*基本样式*/
    #welcome-loading {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #673ab7;
        z-index: 9999;
    }

    pre {
        text-indent: -4.8rem;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -90px;
        color: #fff;
        font-weight: bold;
        height: 180px;
        width: 200px;
        padding: 10px;
    }

    .fade-transition {
        transition: all 0.5s ease;
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
            }
        }
    };
</script>
