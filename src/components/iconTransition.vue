<style scoped>
    @import '../assets/style/common';

    /*基本样式*/
    svg {
        width: 100%;
        height: @width;
        base-trans();
    }

    line {
        stroke-width: 5;
        base-trans();
    }

    $trans-poss = -23px 0 23px;

    .menu {
        line {
            for trans-pos, i in $trans-poss {
                &:nth-child({i + 1}) {
                    transform: translate(0, trans-pos) rotate(0) scale(12, 1);
                }
            }
        }
    }

    $rot-poss = -135deg 0 135deg;

    cacle-func(rot-pos) {
        if rot-pos != 0 {
            transform: translate(0, 0) rotate(rot-pos) scale(12, 1);
        } else {
            transform: translate(0, 0) scale(0.01);
        }
    }

    .cancle {
        line {
            for rot-pos, i in $rot-poss {
                &:nth-child({i + 1}) {
                    cacle-func(rot-pos);
                }
            }
        }
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
