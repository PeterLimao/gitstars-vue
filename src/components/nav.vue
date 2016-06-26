<style scoped>
    /*基本样式*/
    .nav {
        overflow-y: scroll;
    }

    li {
        text-align: center;
        height: 35px;
        line-height: 35px;
    }

    /*过渡动画*/
    .nav-transition {
        transition: all .3s ease;
        height: 300px;
    }

    .nav-enter, .nav-leave {
        height: 0;
    }
</style>
<template>
    <div v-show="isShowNav" class="nav" transition="nav">
        <ul v-for="item in lanList">
            <li>
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        vuex: {
            getters: {
                isShowNav (state) {
                    return state.showNav;
                },
                lanList (state) {
                    return state.languageList;
                }
            }
        }
    };
</script>
