<style scoped>
    /*基本样式*/
    nav {
        width: 100%;
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
        overflow: hidden;
    }

    .nav-enter, .nav-leave {
        height: 0;
    }
</style>
<template>
    <nav v-show="isShowNav" transition="nav">
        <ul>
            <li>
                All
            </li>
            <li>
                Java
            </li>
            <li>
                Python
            </li>
            <li>
                Ruby
            </li>
        </ul>
    </nav>
</template>
<script>
    export default {
        vuex: {
            getters: {
                isShowNav (state) {
                    return state.showNav;
                }
            }
        }
    };
</script>
