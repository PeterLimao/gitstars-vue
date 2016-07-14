<style scoped>
    /*基本样式*/
    #welcome-loading {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 9999;
    }

    pre {
        background: #000000;
        text-indent: -4.8rem;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -90px;
        color: #fff;
        font-weight: bold;
        height: 180px;
        width: 300px;
        padding: 10px;
        border-radius: 5px;
        border: 5px solid #5D5959;
    }

    .footer {
        position: absolute;
        width: 100%;
        left: 0;
        top: 55%;
    }

    .footer div:first-child {
        margin: 0 auto;
        width: 10px;
        height: 100px;
        background: #5D5959;
    }

    .footer div:last-child {
        margin: 0 auto;
        width: 100px;
        height: 10px;
        background: #5D5959;
    }

    .fade-transition {
        transition: all 1s ease;
        opacity: 1;
    }

    .fade-leave {
        opacity: 0;
    }
</style>
<template>
    <div id="welcome-loading" v-if="isShow" transition="fade">
        <pre>
            {{innerContent}}
        </pre>
        <div class="footer">
            <div></div>
            <div></div>
        </div>
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
            getConfig().then((response) => {
                this.content = response.data.welcome;
                this.renderContent(() => {
                    this.isShow = false;
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
                    this.innerContent += this.content.charAt(index);
                    index++;
                }, 100);
            }
        }
    };
</script>
