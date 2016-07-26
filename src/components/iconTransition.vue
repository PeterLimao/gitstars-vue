<style scoped>
    /*基本样式*/
    svg {
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
    }

    line {
        stroke-width: 5;
        transition: all 0.3s ease;
    }

    .menu line:nth-child(1) {
        transform: translate(0, -23px) rotate(0) scale(12, 1);
    }

    .menu line:nth-child(2) {
        transform: translate(0, 0) rotate(0) scale(12, 1);
    }

    .menu line:nth-child(3) {
        transform: translate(0, 23px) rotate(0) scale(12, 1);
    }

    .cancle line:nth-child(1) {
        transform: translate(0, 0) rotate(135deg) scale(12, 1);
    }

    .cancle line:nth-child(2) {
        transform: translate(0, 0) scale(0.01);
    }

    .cancle line:nth-child(3) {
        transform: translate(0, 0) rotate(-135deg) scale(12, 1);
    }
</style>
<template>
    <div id="icon-translate">
        <svg viewBox="0 0 100 100" :class="type" :style="rotate">
            <g transform="translate(50, 50)">
                <line x1="-3" y1="0" x2="3" y2="0" :stroke="color"></line>
                <line x1="-3" y1="0" x2="3" y2="0" :stroke="color"></line>
                <line x1="-3" y1="0" x2="3" y2="0" :stroke="color"></line>
            </g>
        </svg>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                rotate: {
                    transform: 'rotate(0)'
                }
            }
        },
        props: {
            color: {
                type: String,
                default: '#000'
            },
            type: {
                type: String,
                default: 'menu'
            }
        }
    }
</script>
