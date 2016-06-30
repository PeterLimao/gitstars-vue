<style scoped>
    /*基本样式*/
    .nav {
        overflow-y: scroll;
        width: 300px;
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 11;
        background: #fff;
    }

    i {
        position: fixed;
        right: 10px;
        top: 10px;
        color: #673ab7;
    }

    ul {
        margin-top: 30px;
    }

    li {
        text-align: center;
        height: 35px;
        line-height: 35px;
    }

    /*过渡动画*/
    .nav-transition {
        transition: all .3s ease;
    }

    .nav-enter, .nav-leave {
        width: 0;
    }
</style>
<template>
    <div v-show="isShowNav" class="nav z-depth-1" transition="nav">
        <div class="">
            <i class="material-icons small" v-touch:tap="setShowNav(false)">clear</i>
        </div>
        <ul>
            <li v-for="item in lanList" v-touch:tap="getType(item)">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
    import Actions from 'actions';

    export default {
        vuex: {
            getters: {
                isShowNav (state) {
                    return state.showNav;
                },
                lanList (state) {
                    return state.languageList;
                }
            },
            actions: {
                setShowNav: Actions.setShowNav,
                setTredingList: Actions.setTredingList,
                setLoad: Actions.setLoad,
                setCurrentLan: Actions.setCurrentLan
            }
        },
        methods: {
            getType (type) {
                this.setShowNav(false);
                this.setLoad(true);
                this.setTredingList((success) => {
                    if (success) {
                        this.setCurrentLan(type);
                        this.setLoad(false);
                    }
                }, type);
            }
        }
    };
</script>
